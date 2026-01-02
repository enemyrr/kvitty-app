import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { workspaceMembers } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export const createTRPCContext = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    session,
    db,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

// Procedure that verifies workspace membership
export const workspaceProcedure = protectedProcedure
  .input((val: unknown) => {
    if (typeof val !== "object" || val === null || !("workspaceId" in val)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "workspaceId is required",
      });
    }
    return val as { workspaceId: string };
  })
  .use(async ({ ctx, input, next }) => {
    const membership = await ctx.db.query.workspaceMembers.findFirst({
      where: and(
        eq(workspaceMembers.workspaceId, input.workspaceId),
        eq(workspaceMembers.userId, ctx.session.user.id)
      ),
    });

    if (!membership) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({
      ctx: {
        ...ctx,
        workspaceId: input.workspaceId,
      },
    });
  });
