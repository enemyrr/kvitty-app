import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { CreateWorkspaceForm } from "@/components/create-workspace-form";

export const metadata: Metadata = {
  title: "Ny arbetsyta — Kvitty",
};

export default async function NewWorkspacePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const userName = session.user.name;
  const firstName = userName ? userName.split(" ")[0] : null;

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex flex-col gap-6 max-w-lg w-full">
        <div className="flex flex-col items-center gap-2 text-center mb-4">
          <h1 className="text-2xl font-bold">
            {firstName ? `Hej ${firstName}! 👋` : "Välkommen till Kvitty"}
          </h1>
          <p className="text-muted-foreground">
            {firstName
              ? "Låt oss skapa din första arbetsyta tillsammans"
              : "Skapa din arbetsyta för att komma igång"}
          </p>
        </div>
        <CreateWorkspaceForm userName={session.user.name} />
      </div>
    </div>
  );
}
