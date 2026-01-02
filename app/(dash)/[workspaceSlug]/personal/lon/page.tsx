"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Money, Play, FileCode, Download, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc/client";
import { useWorkspace } from "@/components/workspace-provider";

const statusLabels: Record<string, { label: string; color: string }> = {
  draft: { label: "Utkast", color: "bg-gray-100 text-gray-700" },
  calculated: { label: "Beräknad", color: "bg-blue-100 text-blue-700" },
  approved: { label: "Godkänd", color: "bg-green-100 text-green-700" },
  paid: { label: "Utbetald", color: "bg-purple-100 text-purple-700" },
  reported: { label: "Rapporterad", color: "bg-teal-100 text-teal-700" },
};

export default function PayrollPage() {
  const { workspace, periods } = useWorkspace();
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]?.id || "");
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [paymentDate, setPaymentDate] = useState(() => {
    const now = new Date();
    now.setDate(25);
    return now.toISOString().split("T")[0];
  });

  const utils = trpc.useUtils();

  const { data: runs, isLoading } = trpc.payroll.listRuns.useQuery({
    workspaceId: workspace.id,
  });

  const createRun = trpc.payroll.createRun.useMutation({
    onSuccess: () => {
      utils.payroll.listRuns.invalidate();
      setCreateOpen(false);
    },
  });

  const formatCurrency = (value: string | null) => {
    if (!value) return "0 kr";
    return `${parseFloat(value).toLocaleString("sv-SE")} kr`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${workspace.slug}/personal`}>
                  Personal
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Lönekörningar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Lönekörningar</h1>
            <p className="text-muted-foreground text-sm">
              Hantera löner och generera AGI-deklarationer
            </p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="size-4 mr-2" />
            Ny lönekörning
          </Button>
        </div>

      {runs?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Money className="size-12 mx-auto mb-4 text-muted-foreground" weight="duotone" />
            <h3 className="font-medium mb-2">Inga lönekörningar</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Skapa en lönekörning för att börja betala ut löner.
            </p>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="size-4 mr-2" />
              Ny lönekörning
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Körning</TableHead>
                <TableHead>Utbetalningsdatum</TableHead>
                <TableHead className="text-right">Bruttolön</TableHead>
                <TableHead className="text-right">Arbetsgivaravgift</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {runs?.map((run) => {
                const status = statusLabels[run.status] || statusLabels.draft;
                return (
                  <TableRow key={run.id}>
                    <TableCell className="font-medium">
                      {run.period.substring(0, 4)}-{run.period.substring(4)}
                    </TableCell>
                    <TableCell>Körning {run.runNumber}</TableCell>
                    <TableCell>{run.paymentDate}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(run.totalGrossSalary)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(run.totalEmployerContributions)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={status.color}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/${workspace.slug}/personal/lon/${run.id}`}>
                        <Button variant="ghost" size="sm">
                          Öppna
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Create Payroll Run Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny lönekörning</DialogTitle>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <FieldLabel>Räkenskapsperiod</FieldLabel>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
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
              <FieldLabel htmlFor="month">Lönemånad (YYYYMM)</FieldLabel>
              <Input
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="202501"
                maxLength={6}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="paymentDate">Utbetalningsdatum</FieldLabel>
              <Input
                id="paymentDate"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Avbryt
            </Button>
            <Button
              onClick={() =>
                createRun.mutate({
                  workspaceId: workspace.id,
                  fiscalPeriodId: selectedPeriod,
                  period: month,
                  paymentDate,
                })
              }
              disabled={createRun.isPending || !selectedPeriod || month.length !== 6}
            >
              {createRun.isPending ? <Spinner /> : "Skapa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
}
