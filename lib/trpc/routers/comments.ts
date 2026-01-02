import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, workspaceProcedure } from "../init";
import { comments, verifications, auditLogs } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export const commentsRouter = router({
  list: workspaceProcedure
    .input(z.object({ workspaceId: z.string(), verificationId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Verify verification belongs to workspace
      const verification = await ctx.db.query.verifications.findFirst({
        where: and(
          eq(verifications.id, input.verificationId),
          eq(verifications.workspaceId, ctx.workspaceId)
        ),
      });

      if (!verification) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const items = await ctx.db.query.comments.findMany({
        where: eq(comments.verificationId, input.verificationId),
        orderBy: (c, { desc }) => [desc(c.createdAt)],
        with: {
          createdByUser: {
            columns: { id: true, name: true, email: true },
          },
        },
      });

      return items;
    }),

  create: workspaceProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        verificationId: z.string(),
        content: z.string().min(1, "Kommentar krävs"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify verification belongs to workspace
      const verification = await ctx.db.query.verifications.findFirst({
        where: and(
          eq(verifications.id, input.verificationId),
          eq(verifications.workspaceId, ctx.workspaceId)
        ),
      });

      if (!verification) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [comment] = await ctx.db
        .insert(comments)
        .values({
          verificationId: input.verificationId,
          content: input.content,
          createdBy: ctx.session.user.id,
        })
        .returning();

      // Create audit log
      await ctx.db.insert(auditLogs).values({
        workspaceId: ctx.workspaceId,
        userId: ctx.session.user.id,
        action: "create",
        entityType: "comment",
        entityId: comment.id,
        changes: { after: comment },
      });

      return comment;
    }),

  delete: workspaceProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        verificationId: z.string(),
        commentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.query.comments.findFirst({
        where: eq(comments.id, input.commentId),
        with: {
          verification: true,
        },
      });

      if (!comment || comment.verification.workspaceId !== ctx.workspaceId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // Only comment creator can delete
      if (comment.createdBy !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.delete(comments).where(eq(comments.id, input.commentId));

      // Create audit log
      await ctx.db.insert(auditLogs).values({
        workspaceId: ctx.workspaceId,
        userId: ctx.session.user.id,
        action: "delete",
        entityType: "comment",
        entityId: input.commentId,
        changes: { before: comment },
      });

      return { success: true };
    }),
});
