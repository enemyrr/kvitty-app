"use client";

import { Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PayrollEntry {
  id: string;
  employee: {
    firstName: string;
    lastName: string;
  };
  grossSalary: string;
  taxDeduction: string;
  employerContributions: string;
  netSalary: string;
}

interface PayrollRunEntriesTableProps {
  entries: PayrollEntry[];
  isDraft: boolean;
  onRemove: (entryId: string) => void;
  isRemoving?: boolean;
}

export function PayrollRunEntriesTable({
  entries,
  isDraft,
  onRemove,
  isRemoving = false,
}: PayrollRunEntriesTableProps) {
  const formatCurrency = (value: string | number | null) => {
    if (!value) return "0 kr";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return `${num.toLocaleString("sv-SE")} kr`;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Anställd</TableHead>
          <TableHead className="text-right">Bruttolön</TableHead>
          <TableHead className="text-right">Skatteavdrag</TableHead>
          <TableHead className="text-right">Arb.avg</TableHead>
          <TableHead className="text-right">Nettolön</TableHead>
          {isDraft && <TableHead className="w-[50px]"></TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="font-medium">
              {entry.employee.firstName} {entry.employee.lastName}
            </TableCell>
            <TableCell className="text-right font-mono">
              {formatCurrency(entry.grossSalary)}
            </TableCell>
            <TableCell className="text-right font-mono">
              {formatCurrency(entry.taxDeduction)}
            </TableCell>
            <TableCell className="text-right font-mono">
              {formatCurrency(entry.employerContributions)}
            </TableCell>
            <TableCell className="text-right font-mono">
              {formatCurrency(entry.netSalary)}
            </TableCell>
            {isDraft && (
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(entry.id)}
                  disabled={isRemoving}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash className="size-4" />
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

