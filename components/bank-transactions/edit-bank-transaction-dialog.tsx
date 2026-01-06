"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import type { bankTransactions } from "@/lib/db/schema";

type BankTransaction = typeof bankTransactions.$inferSelect;

interface EditBankTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: BankTransaction;
  workspaceId: string;
}

export function EditBankTransactionDialog({
  open,
  onOpenChange,
  transaction,
  workspaceId,
}: EditBankTransactionDialogProps) {
  const utils = trpc.useUtils();
  const [accountNumber, setAccountNumber] = useState(transaction.accountNumber || "");
  const [accountingDate, setAccountingDate] = useState(
    transaction.accountingDate || ""
  );
  const [ledgerDate, setLedgerDate] = useState(transaction.ledgerDate || "");
  const [currencyDate, setCurrencyDate] = useState(
    transaction.currencyDate || ""
  );
  const [reference, setReference] = useState(transaction.reference || "");
  const [amount, setAmount] = useState(
    transaction.amount ? parseFloat(transaction.amount) : undefined
  );
  const [bookedBalance, setBookedBalance] = useState(
    transaction.bookedBalance ? parseFloat(transaction.bookedBalance) : undefined
  );

  const updateTransaction = trpc.bankTransactions.update.useMutation({
    onSuccess: () => {
      utils.bankTransactions.get.invalidate({
        workspaceId,
        bankTransactionId: transaction.id,
      });
      utils.bankTransactions.list.invalidate({ workspaceId });
      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (open) {
      setAccountNumber(transaction.accountNumber || "");
      setAccountingDate(transaction.accountingDate || "");
      setLedgerDate(transaction.ledgerDate || "");
      setCurrencyDate(transaction.currencyDate || "");
      setReference(transaction.reference || "");
      setAmount(
        transaction.amount ? parseFloat(transaction.amount) : undefined
      );
      setBookedBalance(
        transaction.bookedBalance
          ? parseFloat(transaction.bookedBalance)
          : undefined
      );
    }
  }, [open, transaction]);

  const handleSave = () => {
    updateTransaction.mutate({
      workspaceId,
      bankTransactionId: transaction.id,
      accountNumber: accountNumber || null,
      accountingDate: accountingDate || null,
      ledgerDate: ledgerDate || null,
      currencyDate: currencyDate || null,
      reference: reference || null,
      amount: amount ?? null,
      bookedBalance: bookedBalance ?? null,
    });
  };

  const handleCancel = () => {
    setAccountNumber(transaction.accountNumber || "");
    setAccountingDate(transaction.accountingDate || "");
    setLedgerDate(transaction.ledgerDate || "");
    setCurrencyDate(transaction.currencyDate || "");
    setReference(transaction.reference || "");
    setAmount(
      transaction.amount ? parseFloat(transaction.amount) : undefined
    );
    setBookedBalance(
      transaction.bookedBalance
        ? parseFloat(transaction.bookedBalance)
        : undefined
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Redigera transaktion</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="reference">Referens</FieldLabel>
            <Input
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Valfri referens"
              disabled={updateTransaction.isPending}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="accountNumber">Konto</FieldLabel>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Konto"
              disabled={updateTransaction.isPending}
            />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="accountingDate">Bokföringsdag</FieldLabel>
              <Input
                id="accountingDate"
                type="date"
                value={accountingDate}
                onChange={(e) => setAccountingDate(e.target.value)}
                disabled={updateTransaction.isPending}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="ledgerDate">Reskontradag</FieldLabel>
              <Input
                id="ledgerDate"
                type="date"
                value={ledgerDate}
                onChange={(e) => setLedgerDate(e.target.value)}
                disabled={updateTransaction.isPending}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="currencyDate">Valutadag</FieldLabel>
              <Input
                id="currencyDate"
                type="date"
                value={currencyDate}
                onChange={(e) => setCurrencyDate(e.target.value)}
                disabled={updateTransaction.isPending}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="amount">Belopp</FieldLabel>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount ?? ""}
                onChange={(e) =>
                  setAmount(
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
                placeholder="0.00"
                disabled={updateTransaction.isPending}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="bookedBalance">Bokfört saldo</FieldLabel>
              <Input
                id="bookedBalance"
                type="number"
                step="0.01"
                value={bookedBalance ?? ""}
                onChange={(e) =>
                  setBookedBalance(
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
                placeholder="0.00"
                disabled={updateTransaction.isPending}
              />
            </Field>
          </div>
        </FieldGroup>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={updateTransaction.isPending}
          >
            Avbryt
          </Button>
          <Button onClick={handleSave} disabled={updateTransaction.isPending}>
            {updateTransaction.isPending ? <Spinner /> : "Spara"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

