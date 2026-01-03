import type { Metadata } from "next";
import { TransactionsPageClient } from "@/components/transactions/transactions-page-client";

export const metadata: Metadata = {
  title: "Transaktioner — Kvitty",
};

export default async function TransactionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceSlug: string }>;
  searchParams: Promise<{
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    bankAccountId?: string;
    filter?: string;
  }>;
}) {
  const { workspaceSlug } = await params;
  const { search, dateFrom, dateTo, bankAccountId, filter } = await searchParams;

  return (
    <TransactionsPageClient
      workspaceSlug={workspaceSlug}
      initialSearch={search || ""}
      initialDateFrom={dateFrom || ""}
      initialDateTo={dateTo || ""}
      initialBankAccountId={bankAccountId || ""}
      initialFilter={filter || "all"}
    />
  );
}
