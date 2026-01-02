"use client";

import Link from "next/link";
import { ArrowRight, EnvelopeSimple, ChatText } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { calculateAgeFromPersonnummer } from "@/lib/utils";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  personalNumber: string;
  email: string | null;
  phone: string | null;
  isActive: boolean;
}

interface EmployeesTableProps {
  employees: Employee[];
  workspaceSlug: string;
}

export function EmployeesTable({
  employees,
  workspaceSlug,
}: EmployeesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Namn</TableHead>
          <TableHead>Personnummer</TableHead>
          <TableHead>E-post</TableHead>
          <TableHead>Telefon</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">
              <Link
                href={`/${workspaceSlug}/personal/${employee.id}`}
                className="hover:underline"
              >
                {employee.firstName} {employee.lastName}
              </Link>
            </TableCell>
            <TableCell className="font-mono text-sm">
              {employee.personalNumber}
              {(() => {
                const age = calculateAgeFromPersonnummer(employee.personalNumber);
                return age !== null ? ` (${age} år)` : null;
              })()}
            </TableCell>
            <TableCell>
              {employee.email ? (
                <div className="flex items-center gap-2">
                  {employee.email}
                  <a
                    href={`mailto:${employee.email}`}
                    className="hover:opacity-70"
                  >
                    <EnvelopeSimple className="size-4" />
                  </a>
                </div>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {employee.phone ? (
                <div className="flex items-center gap-2">
                  {employee.phone}
                  <a
                    href={`sms:${employee.phone}`}
                    className="hover:opacity-70"
                  >
                    <ChatText className="size-4" />
                  </a>
                </div>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {employee.isActive ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Aktiv
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                  Arkiverad
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <Link href={`/${workspaceSlug}/personal/${employee.id}`}>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

