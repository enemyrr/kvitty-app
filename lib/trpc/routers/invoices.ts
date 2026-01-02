import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, workspaceProcedure } from "../init";
import { invoices, invoiceLines, customers } from "@/lib/db/schema";
import { eq, and, sql, desc } from "drizzle-orm";
import { createInvoiceSchema, updateInvoiceSchema } from "@/lib/validations/invoice";

export const invoicesRouter = router({
  list: workspaceProcedure
    .input(
      z.object({
        status: z.enum(["draft", "sent", "paid"]).optional(),
        limit: z.number().min(1).max(100).default(50),
      })
    )
    .query(async ({ ctx, input }) => {
      const invoiceList = await ctx.db.query.invoices.findMany({
        where: input.status
          ? and(
              eq(invoices.workspaceId, ctx.workspaceId),
              eq(invoices.status, input.status)
            )
          : eq(invoices.workspaceId, ctx.workspaceId),
        with: {
          customer: true,
          lines: true,
        },
        orderBy: [desc(invoices.invoiceDate), desc(invoices.invoiceNumber)],
        limit: input.limit,
      });

      return invoiceList;
    }),

  get: workspaceProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const invoice = await ctx.db.query.invoices.findFirst({
        where: and(
          eq(invoices.id, input.id),
          eq(invoices.workspaceId, ctx.workspaceId)
        ),
        with: {
          customer: true,
          lines: {
            orderBy: (l, { asc }) => [asc(l.sortOrder)],
          },
          fiscalPeriod: true,
        },
      });

      if (!invoice) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return invoice;
    }),

  getNextNumber: workspaceProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({ maxNumber: sql<number>`COALESCE(MAX(${invoices.invoiceNumber}), 0)` })
      .from(invoices)
      .where(eq(invoices.workspaceId, ctx.workspaceId));

    return (result[0]?.maxNumber || 0) + 1;
  }),

  create: workspaceProcedure
    .input(createInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify customer belongs to workspace
      const customer = await ctx.db.query.customers.findFirst({
        where: and(
          eq(customers.id, input.customerId),
          eq(customers.workspaceId, ctx.workspaceId)
        ),
      });

      if (!customer) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Kund hittades inte" });
      }

      // Get next invoice number
      const result = await ctx.db
        .select({ maxNumber: sql<number>`COALESCE(MAX(${invoices.invoiceNumber}), 0)` })
        .from(invoices)
        .where(eq(invoices.workspaceId, ctx.workspaceId));

      const invoiceNumber = (result[0]?.maxNumber || 0) + 1;

      // Calculate totals
      let subtotal = 0;
      let vatAmount = 0;

      for (const line of input.lines) {
        const lineAmount = line.quantity * line.unitPrice;
        subtotal += lineAmount;
        vatAmount += lineAmount * (line.vatRate / 100);
      }

      const total = subtotal + vatAmount;

      // Create invoice
      const [invoice] = await ctx.db
        .insert(invoices)
        .values({
          workspaceId: ctx.workspaceId,
          customerId: input.customerId,
          fiscalPeriodId: input.fiscalPeriodId || null,
          invoiceNumber,
          invoiceDate: input.invoiceDate,
          dueDate: input.dueDate,
          reference: input.reference || null,
          subtotal: subtotal.toFixed(2),
          vatAmount: vatAmount.toFixed(2),
          total: total.toFixed(2),
          status: "draft",
        })
        .returning();

      // Create lines
      for (let i = 0; i < input.lines.length; i++) {
        const line = input.lines[i];
        const lineAmount = line.quantity * line.unitPrice;

        await ctx.db.insert(invoiceLines).values({
          invoiceId: invoice.id,
          description: line.description,
          quantity: line.quantity.toString(),
          unitPrice: line.unitPrice.toFixed(2),
          vatRate: line.vatRate,
          amount: lineAmount.toFixed(2),
          sortOrder: i,
        });
      }

      return invoice;
    }),

  update: workspaceProcedure
    .input(updateInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.invoices.findFirst({
        where: and(
          eq(invoices.id, input.id),
          eq(invoices.workspaceId, ctx.workspaceId)
        ),
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existing.status !== "draft") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Kan endast redigera utkast",
        });
      }

      // Calculate totals
      let subtotal = 0;
      let vatAmount = 0;

      for (const line of input.lines) {
        const lineAmount = line.quantity * line.unitPrice;
        subtotal += lineAmount;
        vatAmount += lineAmount * (line.vatRate / 100);
      }

      const total = subtotal + vatAmount;

      // Update invoice
      const [updated] = await ctx.db
        .update(invoices)
        .set({
          customerId: input.customerId,
          fiscalPeriodId: input.fiscalPeriodId || null,
          invoiceDate: input.invoiceDate,
          dueDate: input.dueDate,
          reference: input.reference || null,
          subtotal: subtotal.toFixed(2),
          vatAmount: vatAmount.toFixed(2),
          total: total.toFixed(2),
          updatedAt: new Date(),
        })
        .where(eq(invoices.id, input.id))
        .returning();

      // Delete old lines and create new ones
      await ctx.db.delete(invoiceLines).where(eq(invoiceLines.invoiceId, input.id));

      for (let i = 0; i < input.lines.length; i++) {
        const line = input.lines[i];
        const lineAmount = line.quantity * line.unitPrice;

        await ctx.db.insert(invoiceLines).values({
          invoiceId: input.id,
          description: line.description,
          quantity: line.quantity.toString(),
          unitPrice: line.unitPrice.toFixed(2),
          vatRate: line.vatRate,
          amount: lineAmount.toFixed(2),
          sortOrder: i,
        });
      }

      return updated;
    }),

  delete: workspaceProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.invoices.findFirst({
        where: and(
          eq(invoices.id, input.id),
          eq(invoices.workspaceId, ctx.workspaceId)
        ),
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existing.status !== "draft") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Kan endast ta bort utkast",
        });
      }

      // Lines are deleted by cascade
      await ctx.db.delete(invoices).where(eq(invoices.id, input.id));

      return { success: true };
    }),

  markAsSent: workspaceProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.invoices.findFirst({
        where: and(
          eq(invoices.id, input.id),
          eq(invoices.workspaceId, ctx.workspaceId)
        ),
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existing.status !== "draft") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Fakturan är redan skickad",
        });
      }

      const [updated] = await ctx.db
        .update(invoices)
        .set({ status: "sent", updatedAt: new Date() })
        .where(eq(invoices.id, input.id))
        .returning();

      return updated;
    }),

  markAsPaid: workspaceProcedure
    .input(z.object({ id: z.string(), paidDate: z.string().date().optional() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.invoices.findFirst({
        where: and(
          eq(invoices.id, input.id),
          eq(invoices.workspaceId, ctx.workspaceId)
        ),
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [updated] = await ctx.db
        .update(invoices)
        .set({
          status: "paid",
          paidDate: input.paidDate || new Date().toISOString().split("T")[0],
          updatedAt: new Date(),
        })
        .where(eq(invoices.id, input.id))
        .returning();

      return updated;
    }),
});
