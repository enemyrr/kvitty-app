import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, workspaceProcedure } from "../init";
import { attachments, verifications, auditLogs } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { put, del } from "@vercel/blob";

export const attachmentsRouter = router({
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

      const items = await ctx.db.query.attachments.findMany({
        where: eq(attachments.verificationId, input.verificationId),
        orderBy: (a, { desc }) => [desc(a.createdAt)],
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
        fileName: z.string(),
        fileUrl: z.string(),
        fileSize: z.number().optional(),
        mimeType: z.string().optional(),
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

      const [attachment] = await ctx.db
        .insert(attachments)
        .values({
          verificationId: input.verificationId,
          fileName: input.fileName,
          fileUrl: input.fileUrl,
          fileSize: input.fileSize,
          mimeType: input.mimeType,
          createdBy: ctx.session.user.id,
        })
        .returning();

      // Create audit log
      await ctx.db.insert(auditLogs).values({
        workspaceId: ctx.workspaceId,
        userId: ctx.session.user.id,
        action: "create",
        entityType: "attachment",
        entityId: attachment.id,
        changes: { after: attachment },
      });

      return attachment;
    }),

  delete: workspaceProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        verificationId: z.string(),
        attachmentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const attachment = await ctx.db.query.attachments.findFirst({
        where: eq(attachments.id, input.attachmentId),
        with: {
          verification: true,
        },
      });

      if (!attachment || attachment.verification.workspaceId !== ctx.workspaceId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // Delete from Vercel Blob
      try {
        await del(attachment.fileUrl);
      } catch (error) {
        console.error("Failed to delete from blob storage:", error);
      }

      await ctx.db.delete(attachments).where(eq(attachments.id, input.attachmentId));

      // Create audit log
      await ctx.db.insert(auditLogs).values({
        workspaceId: ctx.workspaceId,
        userId: ctx.session.user.id,
        action: "delete",
        entityType: "attachment",
        entityId: input.attachmentId,
        changes: { before: attachment },
      });

      return { success: true };
    }),
});
