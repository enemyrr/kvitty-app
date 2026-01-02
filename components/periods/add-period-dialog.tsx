"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, CalendarDots } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import type { FiscalYearType } from "@/lib/db/schema";

interface AddPeriodDialogProps {
  workspaceId: string;
  workspaceSlug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const months = [
  { value: "01", label: "Januari" },
  { value: "02", label: "Februari" },
  { value: "03", label: "Mars" },
  { value: "04", label: "April" },
  { value: "05", label: "Maj" },
  { value: "06", label: "Juni" },
  { value: "07", label: "Juli" },
  { value: "08", label: "Augusti" },
  { value: "09", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = currentYear - 2; i <= currentYear + 2; i++) {
    years.push(i);
  }
  return years;
}

export function AddPeriodDialog({
  workspaceId,
  workspaceSlug,
  open,
  onOpenChange,
}: AddPeriodDialogProps) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const [fiscalYearType, setFiscalYearType] = useState<FiscalYearType>("calendar");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [startMonth, setStartMonth] = useState("05"); // Default to May for broken year

  // Computed values
  const startYear = parseInt(year);
  const endYear = fiscalYearType === "calendar" ? startYear : startYear + 1;
  const startMonthNum = fiscalYearType === "calendar" ? 1 : parseInt(startMonth);
  const endMonthNum = fiscalYearType === "calendar" ? 12 : (startMonthNum === 1 ? 12 : startMonthNum - 1);
  const endYearActual = fiscalYearType === "calendar" ? startYear : (startMonthNum === 1 ? startYear : startYear + 1);

  const startDate = `${startYear}-${startMonthNum.toString().padStart(2, "0")}-01`;
  const endDate = (() => {
    const lastDay = new Date(endYearActual, endMonthNum, 0).getDate();
    return `${endYearActual}-${endMonthNum.toString().padStart(2, "0")}-${lastDay}`;
  })();

  const label = fiscalYearType === "calendar"
    ? `Räkenskapsår ${startYear}`
    : `Räkenskapsår ${startYear}/${endYearActual}`;

  const urlSlug = fiscalYearType === "calendar"
    ? `${startYear}`
    : `${startYear}-${endYearActual}`;

  const createPeriod = trpc.periods.create.useMutation({
    onSuccess: () => {
      onOpenChange(false);
      utils.periods.list.invalidate({ workspaceId });
      router.push(`/${workspaceSlug}/${urlSlug}`);
    },
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFiscalYearType("calendar");
      setYear(new Date().getFullYear().toString());
      setStartMonth("05");
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createPeriod.mutate({
      workspaceId,
      label,
      urlSlug,
      startDate,
      endDate,
      fiscalYearType,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nytt räkenskapsår</DialogTitle>
          <DialogDescription>
            Skapa en ny bokföringsperiod för ditt företag.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Fiscal Year Type Selection */}
            <Field>
              <FieldLabel>Typ av räkenskapsår</FieldLabel>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setFiscalYearType("calendar")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors",
                    fiscalYearType === "calendar"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <Calendar className="size-8" weight="duotone" />
                  <div className="text-center">
                    <div className="font-medium text-sm">Kalenderår</div>
                    <div className="text-xs text-muted-foreground">Jan – Dec</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFiscalYearType("broken")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors",
                    fiscalYearType === "broken"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <CalendarDots className="size-8" weight="duotone" />
                  <div className="text-center">
                    <div className="font-medium text-sm">Brutet år</div>
                    <div className="text-xs text-muted-foreground">Valfri start</div>
                  </div>
                </button>
              </div>
            </Field>

            {/* Year Selection */}
            <Field>
              <FieldLabel htmlFor="year">
                {fiscalYearType === "calendar" ? "År" : "Startår"}
              </FieldLabel>
              <Select value={year} onValueChange={setYear} disabled={createPeriod.isPending}>
                <SelectTrigger id="year">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {generateYearOptions().map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* Start Month (only for broken year) */}
            {fiscalYearType === "broken" && (
              <Field>
                <FieldLabel htmlFor="startMonth">Startmånad</FieldLabel>
                <Select value={startMonth} onValueChange={setStartMonth} disabled={createPeriod.isPending}>
                  <SelectTrigger id="startMonth">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Räkenskapsåret sträcker sig 12 månader från startmånaden
                </FieldDescription>
              </Field>
            )}

            {/* Preview */}
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(startDate).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
                {" – "}
                {new Date(endDate).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>

            {createPeriod.error && (
              <p className="text-sm text-red-500">{createPeriod.error.message}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createPeriod.isPending}
              >
                Avbryt
              </Button>
              <Button type="submit" disabled={createPeriod.isPending}>
                {createPeriod.isPending ? <Spinner /> : "Skapa"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
