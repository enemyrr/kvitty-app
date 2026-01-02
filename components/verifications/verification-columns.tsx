"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { verifications } from "@/lib/db/schema";

type Verification = typeof verifications.$inferSelect;

export const columns: ColumnDef<Verification>[] = [
  {
    accessorKey: "office",
    header: "Kontor",
    cell: ({ row }) => row.getValue("office") || "—",
  },
  {
    accessorKey: "accountingDate",
    header: "Bokföringsdag",
    cell: ({ row }) => {
      const value = row.getValue("accountingDate");
      return value || "—";
    },
  },
  {
    accessorKey: "ledgerDate",
    header: "Reskontradag",
    cell: ({ row }) => {
      const value = row.getValue("ledgerDate");
      return value || "—";
    },
  },
  {
    accessorKey: "currencyDate",
    header: "Valutadag",
    cell: ({ row }) => {
      const value = row.getValue("currencyDate");
      return value || "—";
    },
  },
  {
    accessorKey: "reference",
    header: "Referens",
    cell: ({ row }) => row.getValue("reference") || "—",
  },
  {
    accessorKey: "amount",
    header: "Insättning/Uttag",
    cell: ({ row }) => {
      const value = row.getValue("amount") as string | null;
      if (!value) return "—";
      const amount = parseFloat(value);
      return new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
      }).format(amount);
    },
  },
  {
    accessorKey: "bookedBalance",
    header: "Bokfört saldo",
    cell: ({ row }) => {
      const value = row.getValue("bookedBalance") as string | null;
      if (!value) return "—";
      const balance = parseFloat(value);
      return new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
      }).format(balance);
    },
  },
];
