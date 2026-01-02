"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Receipt } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc/client";

export default function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const router = useRouter();
  const { data: session, isPending: isSessionLoading } = useSession();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    params.then((p) => setToken(p.token));
  }, [params]);

  const { data: invite, isLoading, error } = trpc.invites.getByToken.useQuery(
    { token },
    { enabled: !!token && !!session }
  );

  const acceptInvite = trpc.invites.accept.useMutation({
    onSuccess: (data) => {
      router.push(`/${data.workspaceSlug}`);
    },
  });

  async function handleAccept() {
    if (!session) {
      router.push(`/login?callbackUrl=/invite/${token}`);
      return;
    }
    acceptInvite.mutate({ token });
  }

  if (isLoading || isSessionLoading || !token) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
        <p className="text-muted-foreground">Laddar...</p>
      </div>
    );
  }

  if (error || acceptInvite.error) {
    const errorMessage = error?.message || acceptInvite.error?.message;
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <Receipt className="size-8" weight="duotone" />
          <h1 className="text-xl font-bold">Ogiltig inbjudan</h1>
          <p className="text-muted-foreground text-sm">{errorMessage}</p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Gå till startsidan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <Receipt className="size-8" weight="duotone" />
        <h1 className="text-xl font-bold">Du är inbjuden</h1>
        <p className="text-muted-foreground text-sm">
          Du har blivit inbjuden att gå med i arbetsytan{" "}
          <span className="font-medium">{invite?.workspace.name}</span>
        </p>
        <Button onClick={handleAccept} disabled={acceptInvite.isPending}>
          {acceptInvite.isPending
            ? "Accepterar..."
            : session
              ? "Acceptera inbjudan"
              : "Logga in för att acceptera"}
        </Button>
      </div>
    </div>
  );
}
