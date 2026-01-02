"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./verification-columns";
import { VerificationDetailSheet } from "./verification-detail-sheet";
import type { verifications } from "@/lib/db/schema";

type Verification = typeof verifications.$inferSelect;

interface VerificationsTableProps {
  data: Verification[];
  workspaceId: string;
}

export function VerificationsTable({ data, workspaceId }: VerificationsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedVerification, setSelectedVerification] =
    useState<Verification | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => setSelectedVerification(row.original)}
                className="cursor-pointer"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Inga verifikationer hittades.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <VerificationDetailSheet
        verification={selectedVerification}
        workspaceId={workspaceId}
        open={!!selectedVerification}
        onOpenChange={(open) => !open && setSelectedVerification(null)}
      />
    </>
  );
}
