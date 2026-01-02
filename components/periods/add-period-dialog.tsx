"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { trpc } from "@/lib/trpc/client";

interface AddPeriodDialogProps {
  workspaceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPeriodDialog({
  workspaceId,
  open,
  onOpenChange,
}: AddPeriodDialogProps) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const [label, setLabel] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const createPeriod = trpc.periods.create.useMutation({
    onSuccess: () => {
      setLabel("");
      setUrlSlug("");
      setStartDate("");
      setEndDate("");
      onOpenChange(false);
      utils.periods.list.invalidate({ workspaceId });
      router.refresh();
    },
  });

  function handleLabelChange(value: string) {
    setLabel(value);
    const slug = value
      .toLowerCase()
      .replace(/\//g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setUrlSlug(slug);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createPeriod.mutate({
      workspaceId,
      label,
      urlSlug,
      startDate,
      endDate,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lägg till bokföringsperiod</DialogTitle>
          <DialogDescription>
            Skapa en ny period för att organisera dina verifikationer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="label">Etikett</FieldLabel>
              <Input
                id="label"
                value={label}
                onChange={(e) => handleLabelChange(e.target.value)}
                placeholder="t.ex. 2024/2025 eller 2025"
                required
                disabled={createPeriod.isPending}
              />
              <FieldDescription>
                Visningsnamnet för perioden i sidomenyn
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="urlSlug">URL</FieldLabel>
              <Input
                id="urlSlug"
                value={urlSlug}
                onChange={(e) => setUrlSlug(e.target.value)}
                placeholder="t.ex. 2024-2025"
                required
                disabled={createPeriod.isPending}
                pattern="[a-z0-9-]+"
              />
              <FieldDescription>
                Används i webbadressen (endast a-z, 0-9 och bindestreck)
              </FieldDescription>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="startDate">Startdatum</FieldLabel>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  disabled={createPeriod.isPending}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="endDate">Slutdatum</FieldLabel>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  disabled={createPeriod.isPending}
                />
              </Field>
            </div>
            {createPeriod.error && (
              <p className="text-sm text-red-500">
                {createPeriod.error.message}
              </p>
            )}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createPeriod.isPending}
              >
                Avbryt
              </Button>
              <Button type="submit" disabled={createPeriod.isPending}>
                {createPeriod.isPending ? "Skapar..." : "Skapa period"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
