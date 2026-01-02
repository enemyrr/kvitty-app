import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { workspaceMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Get user's first workspace
  const membership = await db.query.workspaceMembers.findFirst({
    where: eq(workspaceMembers.userId, session.user.id),
    with: {
      workspace: true,
    },
  });

  if (membership) {
    redirect(`/${membership.workspace.slug}`);
  }

  // No workspaces - redirect to create one
  redirect("/new-workspace");
}
