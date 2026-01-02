"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc/client";

interface AddVerificationDialogProps {
  workspaceId: string;
  periodId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface VerificationRow {
  id: string;
  office: string;
  accountingDate: string;
  ledgerDate: string;
  currencyDate: string;
  reference: string;
  amount: string;
  bookedBalance: string;
}

function createEmptyRow(): VerificationRow {
  return {
    id: crypto.randomUUID(),
    office: "",
    accountingDate: "",
    ledgerDate: "",
    currencyDate: "",
    reference: "",
    amount: "",
    bookedBalance: "",
  };
}

export function AddVerificationDialog({
  workspaceId,
  periodId,
  open,
  onOpenChange,
}: AddVerificationDialogProps) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [rows, setRows] = useState<VerificationRow[]>([createEmptyRow()]);
  const [csvData, setCsvData] = useState("");

  const createVerifications = trpc.verifications.create.useMutation({
    onSuccess: () => {
      setRows([createEmptyRow()]);
      setCsvData("");
      onOpenChange(false);
      utils.verifications.list.invalidate({ workspaceId, periodId });
      router.refresh();
    },
  });

  function updateRow(id: string, field: keyof VerificationRow, value: string) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  function addRow() {
    if (rows.length < 50) {
      setRows((prev) => [...prev, createEmptyRow()]);
    }
  }

  function removeRow(id: string) {
    if (rows.length > 1) {
      setRows((prev) => prev.filter((row) => row.id !== id));
    }
  }

  function parseCsv() {
    const lines = csvData.trim().split("\n");
    const parsed: VerificationRow[] = [];

    for (const line of lines) {
      // Handle tab-separated or comma-separated
      const parts = line.includes("\t") ? line.split("\t") : line.split(",");

      if (parts.length >= 1) {
        parsed.push({
          id: crypto.randomUUID(),
          office: parts[0]?.trim() || "",
          accountingDate: parts[1]?.trim() || "",
          ledgerDate: parts[2]?.trim() || "",
          currencyDate: parts[3]?.trim() || "",
          reference: parts[4]?.trim() || "",
          amount: parts[5]?.trim().replace(/\s/g, "").replace(",", ".") || "",
          bookedBalance: parts[6]?.trim().replace(/\s/g, "").replace(",", ".") || "",
        });
      }
    }

    if (parsed.length > 0) {
      setRows(parsed.slice(0, 50)); // Max 50 rows
    }
  }

  function handleSubmit() {
    const validRows = rows.filter(
      (row) => row.reference || row.amount || row.accountingDate
    );

    if (validRows.length === 0) return;

    createVerifications.mutate({
      workspaceId,
      fiscalPeriodId: periodId,
      verifications: validRows.map((row) => ({
        office: row.office || null,
        accountingDate: row.accountingDate || null,
        ledgerDate: row.ledgerDate || null,
        currencyDate: row.currencyDate || null,
        reference: row.reference || null,
        amount: row.amount ? parseFloat(row.amount) : null,
        bookedBalance: row.bookedBalance ? parseFloat(row.bookedBalance) : null,
      })),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Lägg till verifikationer</DialogTitle>
          <DialogDescription>
            Lägg till upp till 50 verifikationer åt gången.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="manual" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manuell inmatning</TabsTrigger>
            <TabsTrigger value="csv">Klistra in CSV</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="flex-1 overflow-auto">
            <div className="space-y-2">
              <div className="grid grid-cols-[80px_100px_100px_100px_1fr_120px_120px_40px] gap-2 text-xs font-medium text-muted-foreground sticky top-0 bg-background py-2">
                <div>Kontor</div>
                <div>Bokf.dag</div>
                <div>Resk.dag</div>
                <div>Val.dag</div>
                <div>Referens</div>
                <div>Belopp</div>
                <div>Saldo</div>
                <div></div>
              </div>

              {rows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[80px_100px_100px_100px_1fr_120px_120px_40px] gap-2"
                >
                  <Input
                    placeholder="6886"
                    value={row.office}
                    onChange={(e) => updateRow(row.id, "office", e.target.value)}
                    className="h-8 text-sm"
                  />
                  <Input
                    type="date"
                    value={row.accountingDate}
                    onChange={(e) =>
                      updateRow(row.id, "accountingDate", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                  <Input
                    type="date"
                    value={row.ledgerDate}
                    onChange={(e) =>
                      updateRow(row.id, "ledgerDate", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                  <Input
                    type="date"
                    value={row.currencyDate}
                    onChange={(e) =>
                      updateRow(row.id, "currencyDate", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                  <Input
                    placeholder="Referens"
                    value={row.reference}
                    onChange={(e) =>
                      updateRow(row.id, "reference", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                  <Input
                    placeholder="-100.00"
                    value={row.amount}
                    onChange={(e) => updateRow(row.id, "amount", e.target.value)}
                    className="h-8 text-sm"
                  />
                  <Input
                    placeholder="10000.00"
                    value={row.bookedBalance}
                    onChange={(e) =>
                      updateRow(row.id, "bookedBalance", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length === 1}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              ))}

              {rows.length < 50 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRow}
                >
                  <Plus className="size-4 mr-2" />
                  Lägg till rad
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="csv" className="flex-1 flex flex-col gap-4">
            <Textarea
              placeholder="Klistra in data från Excel eller bankutdrag här... (tab- eller kommaseparerat)

Kontor   Bokf.dag   Resk.dag   Val.dag   Referens   Belopp   Saldo
6886     2025-12-30 2025-12-30 2025-12-30 CLAUDE.AI  -198,94  137659,39"
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              className="flex-1 min-h-[200px] font-mono text-sm"
            />
            <Button
              type="button"
              variant="outline"
              onClick={parseCsv}
              disabled={!csvData.trim()}
            >
              Analysera och förhandsgranska
            </Button>
            {rows.length > 1 && (
              <p className="text-sm text-muted-foreground">
                {rows.length} rader redo att läggas till
              </p>
            )}
          </TabsContent>
        </Tabs>

        {createVerifications.error && (
          <p className="text-sm text-red-500">
            {createVerifications.error.message}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={createVerifications.isPending}
          >
            Avbryt
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createVerifications.isPending}
          >
            {createVerifications.isPending
              ? "Sparar..."
              : `Lägg till ${rows.filter((r) => r.reference || r.amount).length} verifikationer`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
