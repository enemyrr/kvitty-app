"use client";

import { useState, useMemo } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { VerificationTemplate, ScaledTransaction } from "@/lib/types/templates";
import { applyTemplateAmount, PAYMENT_ACCOUNTS } from "@/lib/utils/template-utils";

interface TemplateInputFormProps {
  template: VerificationTemplate;
  onSubmit: (transactions: ScaledTransaction[], title: string, comment?: string) => void;
  onBack: () => void;
  defaultDate?: string;
}

export function TemplateInputForm({
  template,
  onSubmit,
  onBack,
  defaultDate,
}: TemplateInputFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState(defaultDate || new Date().toISOString().split("T")[0]);
  const [paymentAccountNumber, setPaymentAccountNumber] = useState<string>("1930");
  const [title, setTitle] = useState(template.name);
  const [comment, setComment] = useState("");

  const paymentAccount = useMemo(() => {
    const account = PAYMENT_ACCOUNTS.find((a) => a.number === Number(paymentAccountNumber));
    return account || PAYMENT_ACCOUNTS[0];
  }, [paymentAccountNumber]);

  const parsedAmount = useMemo(() => {
    const cleaned = amount.replace(/\s/g, "").replace(",", ".");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }, [amount]);

  const scaledTransactions = useMemo(() => {
    if (parsedAmount <= 0) {
      return [];
    }
    return applyTemplateAmount(template, parsedAmount, {
      number: paymentAccount.number,
      name: paymentAccount.name,
    });
  }, [template, parsedAmount, paymentAccount]);

  const totalDebit = scaledTransactions.reduce((sum, t) => sum + (t.debit || 0), 0);
  const totalCredit = scaledTransactions.reduce((sum, t) => sum + (t.credit || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedAmount <= 0 || !isBalanced) return;
    onSubmit(scaledTransactions, title, comment || undefined);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("sv-SE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Header with template info */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">{template.name}</h3>
        {template.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {template.description}
          </p>
        )}
      </div>

      <FieldGroup className="flex-1 overflow-y-auto">
        {/* Amount */}
        <Field>
          <FieldLabel htmlFor="amount">Belopp *</FieldLabel>
          <div className="relative">
            <Input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pr-10"
              autoFocus
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              kr
            </span>
          </div>
        </Field>

        {/* Date */}
        <Field>
          <FieldLabel htmlFor="template-date">Datum</FieldLabel>
          <Input
            id="template-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>

        {/* Payment Account */}
        <Field>
          <FieldLabel htmlFor="payment-account">Betalkonto</FieldLabel>
          <Select value={paymentAccountNumber} onValueChange={setPaymentAccountNumber}>
            <SelectTrigger id="payment-account">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_ACCOUNTS.map((account) => (
                <SelectItem key={account.number} value={String(account.number)}>
                  {account.number} - {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Title */}
        <Field>
          <FieldLabel htmlFor="template-title">Titel</FieldLabel>
          <Input
            id="template-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        {/* Comment */}
        <Field>
          <FieldLabel htmlFor="template-comment">Kommentar (valfritt)</FieldLabel>
          <Textarea
            id="template-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            placeholder="Lägg till en kommentar..."
          />
        </Field>

        {/* Transaction Preview */}
        {scaledTransactions.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Förhandsgranskning
            </p>
            <div className="space-y-2 bg-muted/30 rounded-lg p-3">
              {scaledTransactions.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {t.accountNumber} {t.accountName}
                  </span>
                  <span className={cn(t.debit ? "text-red-600" : "text-green-600")}>
                    {t.debit
                      ? `Debet: ${formatCurrency(t.debit)} kr`
                      : `Kredit: ${formatCurrency(t.credit || 0)} kr`}
                  </span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-border/50 flex justify-between text-sm font-medium">
                <span>Summa</span>
                <span className={isBalanced ? "text-green-600" : "text-red-600"}>
                  {formatCurrency(totalDebit)} kr
                </span>
              </div>
            </div>
          </div>
        )}
      </FieldGroup>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t mt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Tillbaka
        </Button>
        <Button
          type="submit"
          disabled={parsedAmount <= 0 || !isBalanced}
          className="flex-1"
        >
          Använd mall
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}
