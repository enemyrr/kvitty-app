"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Receipt, ShoppingCart, Money, FileText, DotsThree } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JournalEntryLineRow } from "./journal-entry-line-row";
import { AIChat } from "@/components/ai-chat";
import { trpc } from "@/lib/trpc/client";
import type { fiscalPeriods } from "@/lib/db/schema";
import type { JournalEntryLineInput, JournalEntryType } from "@/lib/validations/journal-entry";

type FiscalPeriod = typeof fiscalPeriods.$inferSelect;

interface AddJournalEntryDialogProps {
  workspaceId: string;
  periods: FiscalPeriod[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPeriodId?: string;
}

const entryTypes: { value: JournalEntryType; label: string; icon: typeof Receipt }[] = [
  { value: "kvitto", label: "Kvitto/Utgift", icon: Receipt },
  { value: "inkomst", label: "Inkomst", icon: Money },
  { value: "leverantorsfaktura", label: "Leverantörsfaktura", icon: FileText },
  { value: "annat", label: "Annat", icon: DotsThree },
];

const emptyLine: JournalEntryLineInput = {
  accountNumber: 0,
  accountName: "",
  debit: undefined,
  credit: undefined,
};

export function AddJournalEntryDialog({
  workspaceId,
  periods,
  open,
  onOpenChange,
  defaultPeriodId,
}: AddJournalEntryDialogProps) {
  const router = useRouter();
  const [fiscalPeriodId, setFiscalPeriodId] = useState(defaultPeriodId || periods[0]?.id || "");
  const [entryType, setEntryType] = useState<JournalEntryType>("kvitto");
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [lines, setLines] = useState<JournalEntryLineInput[]>([
    { ...emptyLine },
    { ...emptyLine },
  ]);
  const [error, setError] = useState<string | null>(null);

  const utils = trpc.useUtils();

  const createEntry = trpc.journalEntries.create.useMutation({
    onSuccess: () => {
      utils.journalEntries.list.invalidate();
      onOpenChange(false);
      resetForm();
      router.refresh();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const resetForm = () => {
    setEntryType("kvitto");
    setEntryDate(new Date().toISOString().split("T")[0]);
    setDescription("");
    setLines([{ ...emptyLine }, { ...emptyLine }]);
    setError(null);
  };

  const handleLineChange = (index: number, line: JournalEntryLineInput) => {
    const newLines = [...lines];
    newLines[index] = line;
    setLines(newLines);
  };

  const handleRemoveLine = (index: number) => {
    if (lines.length > 2) {
      setLines(lines.filter((_, i) => i !== index));
    }
  };

  const handleAddLine = () => {
    setLines([...lines, { ...emptyLine }]);
  };

  const handleAISuggestion = (suggestion: {
    description: string;
    lines: Array<{
      accountNumber: number;
      accountName: string;
      debit: number;
      credit: number;
    }>;
  }) => {
    // Set lines from suggestion (convert 0 to undefined for the form)
    setLines(
      suggestion.lines.map((l) => ({
        accountNumber: l.accountNumber,
        accountName: l.accountName,
        debit: l.debit || undefined,
        credit: l.credit || undefined,
      }))
    );
    // Also set description if current is empty
    if (suggestion.description && !description) {
      setDescription(suggestion.description);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate
    const validLines = lines.filter(
      (l) => l.accountNumber && l.accountName && (l.debit || l.credit)
    );

    if (validLines.length < 2) {
      setError("Minst två rader med konto och belopp krävs");
      return;
    }

    const totalDebit = validLines.reduce((sum, l) => sum + (l.debit || 0), 0);
    const totalCredit = validLines.reduce((sum, l) => sum + (l.credit || 0), 0);

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      setError(`Verifikationen balanserar inte. Debet: ${totalDebit}, Kredit: ${totalCredit}`);
      return;
    }

    createEntry.mutate({
      workspaceId,
      fiscalPeriodId,
      entryDate,
      description,
      entryType,
      sourceType: "manual",
      lines: validLines,
    });
  };

  const totalDebit = lines.reduce((sum, l) => sum + (l.debit || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + (l.credit || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Ny verifikation</DialogTitle>
        </DialogHeader>

        {/* Entry Type Tabs */}
        <Tabs value={entryType} onValueChange={(v) => setEntryType(v as JournalEntryType)}>
          <TabsList className="w-full justify-start">
            {entryTypes.map((type) => (
              <TabsTrigger key={type.value} value={type.value} className="gap-2">
                <type.icon className="size-4" weight="duotone" />
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex-1 overflow-hidden grid grid-cols-2 gap-4 mt-4">
          {/* Left side - Manual entry */}
          <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
            <FieldGroup className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="period">Period</FieldLabel>
                  <Select value={fiscalPeriodId} onValueChange={setFiscalPeriodId}>
                    <SelectTrigger id="period">
                      <SelectValue placeholder="Välj period" />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map((period) => (
                        <SelectItem key={period.id} value={period.id}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="date">Datum</FieldLabel>
                  <Input
                    id="date"
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    required
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="description">Beskrivning</FieldLabel>
                <Input
                  id="description"
                  type="text"
                  placeholder="T.ex. Inköp av dator"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Field>

              <div className="space-y-2">
                <FieldLabel>Konteringar</FieldLabel>
                <div className="grid grid-cols-[1fr_120px_120px_40px] gap-2 text-xs text-muted-foreground font-medium px-1">
                  <span>Konto</span>
                  <span className="text-right">Debet</span>
                  <span className="text-right">Kredit</span>
                  <span></span>
                </div>

                <div className="space-y-2">
                  {lines.map((line, index) => (
                    <JournalEntryLineRow
                      key={index}
                      line={line}
                      index={index}
                      onChange={handleLineChange}
                      onRemove={handleRemoveLine}
                      canRemove={lines.length > 2}
                      disabled={createEntry.isPending}
                    />
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddLine}
                  className="w-full"
                >
                  <Plus className="size-4 mr-2" />
                  Lägg till rad
                </Button>
              </div>

              {/* Summary */}
              <div className="flex items-center justify-between text-sm border-t pt-4">
                <span className="text-muted-foreground">Summa:</span>
                <div className="flex gap-4">
                  <span>
                    Debet: <strong>{totalDebit.toFixed(2)} kr</strong>
                  </span>
                  <span>
                    Kredit: <strong>{totalCredit.toFixed(2)} kr</strong>
                  </span>
                  <span
                    className={
                      isBalanced ? "text-green-600" : "text-red-600"
                    }
                  >
                    {isBalanced ? "Balanserat" : "Obalanserat"}
                  </span>
                </div>
              </div>

              {error && <FieldError>{error}</FieldError>}
            </FieldGroup>

            <div className="flex gap-3 pt-4 border-t mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createEntry.isPending}
                className="flex-1"
              >
                Avbryt
              </Button>
              <Button
                type="submit"
                disabled={createEntry.isPending || !isBalanced}
                className="flex-1"
              >
                {createEntry.isPending ? <Spinner /> : "Spara verifikation"}
              </Button>
            </div>
          </form>

          {/* Right side - AI Chat */}
          <div className="border-l pl-4 overflow-hidden">
            <AIChat
              onSuggestion={handleAISuggestion}
              context={{ entryType, description }}
              className="h-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
