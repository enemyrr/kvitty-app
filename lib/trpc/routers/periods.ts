import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, workspaceProcedure } from "../init";
import { fiscalPeriods } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { createPeriodSchema, updatePeriodSchema } from "@/lib/validations/period";

export const periodsRouter = router({
  list: workspaceProcedure.query(async ({ ctx }) => {
    const periods = await ctx.db.query.fiscalPeriods.findMany({
      where: eq(fiscalPeriods.workspaceId, ctx.workspaceId),
      orderBy: (periods, { desc }) => [desc(periods.startDate)],
    });

    return periods;
  }),

  get: workspaceProcedure
    .input(z.object({ workspaceId: z.string(), periodId: z.string() }))
    .query(async ({ ctx, input }) => {
      const period = await ctx.db.query.fiscalPeriods.findFirst({
        where: and(
          eq(fiscalPeriods.id, input.periodId),
          eq(fiscalPeriods.workspaceId, ctx.workspaceId)
        ),
      });

      if (!period) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return period;
    }),

  create: workspaceProcedure
    .input(createPeriodSchema.extend({ workspaceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check for duplicate slug
      const existing = await ctx.db.query.fiscalPeriods.findFirst({
        where: and(
          eq(fiscalPeriods.workspaceId, ctx.workspaceId),
          eq(fiscalPeriods.urlSlug, input.urlSlug)
        ),
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "En period med denna URL finns redan",
        });
      }

      const [period] = await ctx.db
        .insert(fiscalPeriods)
        .values({
          workspaceId: ctx.workspaceId,
          label: input.label,
          urlSlug: input.urlSlug,
          startDate: input.startDate,
          endDate: input.endDate,
        })
        .returning();

      return period;
    }),

  update: workspaceProcedure
    .input(
      updatePeriodSchema.extend({
        workspaceId: z.string(),
        periodId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(fiscalPeriods)
        .set({
          label: input.label,
          urlSlug: input.urlSlug,
          startDate: input.startDate,
          endDate: input.endDate,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(fiscalPeriods.id, input.periodId),
            eq(fiscalPeriods.workspaceId, ctx.workspaceId)
          )
        )
        .returning();

      if (!updated) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return updated;
    }),

  delete: workspaceProcedure
    .input(z.object({ workspaceId: z.string(), periodId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(fiscalPeriods)
        .where(
          and(
            eq(fiscalPeriods.id, input.periodId),
            eq(fiscalPeriods.workspaceId, ctx.workspaceId)
          )
        );

      return { success: true };
    }),
});
