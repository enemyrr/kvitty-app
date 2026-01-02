import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, workspaceProcedure } from "../init";
import { workspaces, workspaceMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateUniqueSlug } from "@/lib/workspace-slug";
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "@/lib/validations/workspace";

export const workspacesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const memberships = await ctx.db.query.workspaceMembers.findMany({
      where: eq(workspaceMembers.userId, ctx.session.user.id),
      with: {
        workspace: true,
      },
    });

    return memberships.map((m) => m.workspace);
  }),

  get: workspaceProcedure.query(async ({ ctx }) => {
    const workspace = await ctx.db.query.workspaces.findFirst({
      where: eq(workspaces.id, ctx.workspaceId),
    });

    if (!workspace) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return workspace;
  }),

  create: protectedProcedure
    .input(createWorkspaceSchema)
    .mutation(async ({ ctx, input }) => {
      const slug = await generateUniqueSlug();

      const [workspace] = await ctx.db
        .insert(workspaces)
        .values({
          name: input.name,
          slug,
          createdBy: ctx.session.user.id,
        })
        .returning();

      // Add creator as member
      await ctx.db.insert(workspaceMembers).values({
        workspaceId: workspace.id,
        userId: ctx.session.user.id,
      });

      return workspace;
    }),

  update: workspaceProcedure
    .input(updateWorkspaceSchema.extend({ workspaceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(workspaces)
        .set({
          name: input.name,
          updatedAt: new Date(),
        })
        .where(eq(workspaces.id, ctx.workspaceId))
        .returning();

      return updated;
    }),

  delete: workspaceProcedure.mutation(async ({ ctx }) => {
    const workspace = await ctx.db.query.workspaces.findFirst({
      where: eq(workspaces.id, ctx.workspaceId),
    });

    if (!workspace) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    // Only creator can delete
    if (workspace.createdBy !== ctx.session.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    await ctx.db.delete(workspaces).where(eq(workspaces.id, ctx.workspaceId));

    return { success: true };
  }),
});
