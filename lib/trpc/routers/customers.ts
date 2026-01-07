import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, workspaceProcedure } from "../init";
import { customers, invoices } from "@/lib/db/schema";
import { eq, and, count } from "drizzle-orm";
import { createCustomerSchema, updateCustomerSchema } from "@/lib/validations/customer";

export const customersRouter = router({
  list: workspaceProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const whereClause = eq(customers.workspaceId, ctx.workspaceId);

      const [customerList, totalResult] = await Promise.all([
        ctx.db.query.customers.findMany({
          where: whereClause,
          orderBy: (c, { asc }) => [asc(c.name)],
          limit: input.limit,
          offset: input.offset,
        }),
        ctx.db.select({ count: count() }).from(customers).where(whereClause),
      ]);

      return {
        items: customerList,
        total: totalResult[0]?.count ?? 0,
      };
    }),

  get: workspaceProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const customer = await ctx.db.query.customers.findFirst({
        where: and(
          eq(customers.id, input.id),
          eq(customers.workspaceId, ctx.workspaceId)
        ),
        with: {
          invoices: {
            orderBy: (inv, { desc }) => [desc(inv.invoiceDate)],
            limit: 10,
          },
        },
      });

      if (!customer) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return customer;
    }),

  create: workspaceProcedure
    .input(createCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      const [customer] = await ctx.db
        .insert(customers)
        .values({
          workspaceId: ctx.workspaceId,
          name: input.name,
          orgNumber: input.orgNumber || null,
          email: input.email || null,
          phone: input.phone || null,
          address: input.address || null,
          postalCode: input.postalCode || null,
          city: input.city || null,
        })
        .returning();

      return customer;
    }),

  update: workspaceProcedure
    .input(updateCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.customers.findFirst({
        where: and(
          eq(customers.id, input.id),
          eq(customers.workspaceId, ctx.workspaceId)
        ),
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [updated] = await ctx.db
        .update(customers)
        .set({
          name: input.name,
          orgNumber: input.orgNumber || null,
          email: input.email || null,
          phone: input.phone || null,
          address: input.address || null,
          postalCode: input.postalCode || null,
          city: input.city || null,
          updatedAt: new Date(),
        })
        .where(eq(customers.id, input.id))
        .returning();

      return updated;
    }),

  delete: workspaceProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if customer has invoices
      const hasInvoices = await ctx.db.query.invoices.findFirst({
        where: eq(invoices.customerId, input.id),
      });

      if (hasInvoices) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Kan inte ta bort kund med fakturor",
        });
      }

      await ctx.db
        .delete(customers)
        .where(
          and(
            eq(customers.id, input.id),
            eq(customers.workspaceId, ctx.workspaceId)
          )
        );

      return { success: true };
    }),
});
