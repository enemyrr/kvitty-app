import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { workspaceMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Get user's workspaces to check if they have any
  const memberships = await db.query.workspaceMembers.findMany({
    where: eq(workspaceMembers.userId, session.user.id),
    with: {
      workspace: true,
    },
  });

  // If no workspaces, show onboarding
  if (memberships.length === 0) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
}
