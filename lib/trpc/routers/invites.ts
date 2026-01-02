import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, workspaceProcedure } from "../init";
import { workspaceInvites, workspaceMembers, workspaces } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";

export const invitesRouter = router({
  list: workspaceProcedure.query(async ({ ctx }) => {
    const invites = await ctx.db.query.workspaceInvites.findMany({
      where: and(
        eq(workspaceInvites.workspaceId, ctx.workspaceId),
        isNull(workspaceInvites.usedAt)
      ),
    });

    return invites;
  }),

  create: workspaceProcedure.mutation(async ({ ctx }) => {
    const token = crypto.randomUUID();

    const [invite] = await ctx.db
      .insert(workspaceInvites)
      .values({
        workspaceId: ctx.workspaceId,
        token,
        createdBy: ctx.session.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      })
      .returning();

    return invite;
  }),

  revoke: workspaceProcedure
    .input(z.object({ workspaceId: z.string(), inviteId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(workspaceInvites)
        .where(
          and(
            eq(workspaceInvites.id, input.inviteId),
            eq(workspaceInvites.workspaceId, ctx.workspaceId)
          )
        );

      return { success: true };
    }),

  // Public: Get invite info by token
  getByToken: protectedProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const invite = await ctx.db.query.workspaceInvites.findFirst({
        where: and(
          eq(workspaceInvites.token, input.token),
          isNull(workspaceInvites.usedAt)
        ),
        with: {
          workspace: true,
        },
      });

      if (!invite) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invite not found or expired",
        });
      }

      if (invite.expiresAt && new Date(invite.expiresAt) < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invite expired",
        });
      }

      return {
        workspace: {
          name: invite.workspace.name,
        },
      };
    }),

  // Accept invite
  accept: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const invite = await ctx.db.query.workspaceInvites.findFirst({
        where: and(
          eq(workspaceInvites.token, input.token),
          isNull(workspaceInvites.usedAt)
        ),
      });

      if (!invite) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invite not found or already used",
        });
      }

      if (invite.expiresAt && new Date(invite.expiresAt) < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invite expired",
        });
      }

      // Check if already a member
      const existingMember = await ctx.db.query.workspaceMembers.findFirst({
        where: and(
          eq(workspaceMembers.workspaceId, invite.workspaceId),
          eq(workspaceMembers.userId, ctx.session.user.id)
        ),
      });

      if (existingMember) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Already a member",
        });
      }

      // Add as member
      await ctx.db.insert(workspaceMembers).values({
        workspaceId: invite.workspaceId,
        userId: ctx.session.user.id,
      });

      // Mark invite as used
      await ctx.db
        .update(workspaceInvites)
        .set({
          usedAt: new Date(),
          usedBy: ctx.session.user.id,
        })
        .where(eq(workspaceInvites.id, invite.id));

      // Get workspace for redirect
      const workspace = await ctx.db.query.workspaces.findFirst({
        where: eq(workspaces.id, invite.workspaceId),
      });

      return {
        success: true,
        workspaceSlug: workspace?.slug,
      };
    }),
});
