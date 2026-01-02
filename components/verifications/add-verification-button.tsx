"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { AddVerificationDialog } from "./add-verification-dialog";

interface AddVerificationButtonProps {
  workspaceId: string;
  periodId: string;
}

export function AddVerificationButton({
  workspaceId,
  periodId,
}: AddVerificationButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4 mr-2" />
        Lägg till
      </Button>
      <AddVerificationDialog
        workspaceId={workspaceId}
        periodId={periodId}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
