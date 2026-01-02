import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, workspaceProcedure } from "../init";
import { lockedPeriods, auditLogs } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export const lockedPeriodsRouter = router({
  list: workspaceProcedure
    .input(z.object({ fiscalPeriodId: z.string() }))
    .query(async ({ ctx, input }) => {
      const locked = await ctx.db.query.lockedPeriods.findMany({
        where: and(
          eq(lockedPeriods.workspaceId, ctx.workspaceId),
          eq(lockedPeriods.fiscalPeriodId, input.fiscalPeriodId)
        ),
        with: {
          lockedByUser: true,
        },
        orderBy: (lp, { desc }) => [desc(lp.month)],
      });

      return locked;
    }),

  isLocked: workspaceProcedure
    .input(
      z.object({
        fiscalPeriodId: z.string(),
        month: z.string().regex(/^\d{4}-\d{2}$/),
      })
    )
    .query(async ({ ctx, input }) => {
      const locked = await ctx.db.query.lockedPeriods.findFirst({
        where: and(
          eq(lockedPeriods.workspaceId, ctx.workspaceId),
          eq(lockedPeriods.fiscalPeriodId, input.fiscalPeriodId),
          eq(lockedPeriods.month, input.month)
        ),
      });

      return {
        isLocked: !!locked,
        lockedAt: locked?.lockedAt,
        reason: locked?.reason,
      };
    }),

  lock: workspaceProcedure
    .input(
      z.object({
        fiscalPeriodId: z.string(),
        month: z.string().regex(/^\d{4}-\d{2}$/, "Månad måste vara i format YYYY-MM"),
        reason: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if already locked
      const existing = await ctx.db.query.lockedPeriods.findFirst({
        where: and(
          eq(lockedPeriods.workspaceId, ctx.workspaceId),
          eq(lockedPeriods.fiscalPeriodId, input.fiscalPeriodId),
          eq(lockedPeriods.month, input.month)
        ),
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Denna månad är redan låst",
        });
      }

      const [locked] = await ctx.db
        .insert(lockedPeriods)
        .values({
          workspaceId: ctx.workspaceId,
          fiscalPeriodId: input.fiscalPeriodId,
          month: input.month,
          lockedBy: ctx.session.user.id,
          reason: input.reason || null,
        })
        .returning();

      // Log the lock action
      await ctx.db.insert(auditLogs).values({
        workspaceId: ctx.workspaceId,
        userId: ctx.session.user.id,
        action: "lock",
        entityType: "period",
        entityId: locked.id,
        changes: { month: input.month, reason: input.reason },
      });

      return locked;
    }),

  unlock: workspaceProcedure
    .input(
      z.object({
        fiscalPeriodId: z.string(),
        month: z.string().regex(/^\d{4}-\d{2}$/),
        reason: z.string().min(1, "Anledning krävs för att låsa upp").max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const locked = await ctx.db.query.lockedPeriods.findFirst({
        where: and(
          eq(lockedPeriods.workspaceId, ctx.workspaceId),
          eq(lockedPeriods.fiscalPeriodId, input.fiscalPeriodId),
          eq(lockedPeriods.month, input.month)
        ),
      });

      if (!locked) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Denna månad är inte låst",
        });
      }

      await ctx.db
        .delete(lockedPeriods)
        .where(eq(lockedPeriods.id, locked.id));

      // Log the unlock action
      await ctx.db.insert(auditLogs).values({
        workspaceId: ctx.workspaceId,
        userId: ctx.session.user.id,
        action: "unlock",
        entityType: "period",
        entityId: locked.id,
        changes: { month: input.month, unlockReason: input.reason },
      });

      return { success: true };
    }),
});
