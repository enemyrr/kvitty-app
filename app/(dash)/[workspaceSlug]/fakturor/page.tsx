"use client";

import { useState } from "react";
import { Plus, FilePdf, PaperPlaneTilt, Check, DotsThree, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc/client";
import { CreateInvoiceDialog } from "@/components/invoices/create-invoice-dialog";
import { generateInvoicePdf } from "@/lib/utils/invoice-pdf";
import { useWorkspace } from "@/components/workspace-provider";
import type { InvoiceStatus } from "@/lib/db/schema";

const statusLabels: Record<InvoiceStatus, string> = {
  draft: "Utkast",
  sent: "Skickad",
  paid: "Betald",
};

const statusColors: Record<InvoiceStatus, "secondary" | "default" | "outline"> = {
  draft: "secondary",
  sent: "default",
  paid: "outline",
};

export default function InvoicesPage() {
  const { workspace } = useWorkspace();
  const [createOpen, setCreateOpen] = useState(false);
  const utils = trpc.useUtils();

  const { data: invoices, isLoading } = trpc.invoices.list.useQuery({
    workspaceId: workspace.id,
  });

  const markAsSent = trpc.invoices.markAsSent.useMutation({
    onSuccess: () => utils.invoices.list.invalidate(),
  });

  const markAsPaid = trpc.invoices.markAsPaid.useMutation({
    onSuccess: () => utils.invoices.list.invalidate(),
  });

  const deleteInvoice = trpc.invoices.delete.useMutation({
    onSuccess: () => utils.invoices.list.invalidate(),
  });

  const handleDownloadPdf = async (invoiceId: string) => {
    const invoice = invoices?.find((i) => i.id === invoiceId);
    if (!invoice) return;

    const pdf = generateInvoicePdf({
      workspace,
      invoice,
      customer: invoice.customer,
      lines: invoice.lines,
    });

    pdf.save(`Faktura-${invoice.invoiceNumber}.pdf`);
  };

  const formatCurrency = (value: string) => {
    return parseFloat(value).toLocaleString("sv-SE", {
      minimumFractionDigits: 2,
    }) + " kr";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Fakturor</h1>
          <p className="text-muted-foreground">
            Skapa och hantera kundfakturor
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="size-4 mr-2" />
          Ny faktura
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner className="size-8" />
        </div>
      ) : invoices?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Inga fakturor ännu</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setCreateOpen(true)}
          >
            Skapa din första faktura
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Nummer</TableHead>
              <TableHead>Kund</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Förfaller</TableHead>
              <TableHead>Belopp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-mono">{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.customer.name}</TableCell>
                <TableCell>{new Date(invoice.invoiceDate).toLocaleDateString("sv-SE")}</TableCell>
                <TableCell>{new Date(invoice.dueDate).toLocaleDateString("sv-SE")}</TableCell>
                <TableCell className="font-mono">{formatCurrency(invoice.total)}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[invoice.status as InvoiceStatus]}>
                    {statusLabels[invoice.status as InvoiceStatus]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <DotsThree className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownloadPdf(invoice.id)}>
                        <FilePdf className="size-4 mr-2" />
                        Ladda ner PDF
                      </DropdownMenuItem>
                      {invoice.status === "draft" && (
                        <DropdownMenuItem
                          onClick={() => markAsSent.mutate({ workspaceId: workspace.id, id: invoice.id })}
                        >
                          <PaperPlaneTilt className="size-4 mr-2" />
                          Markera som skickad
                        </DropdownMenuItem>
                      )}
                      {invoice.status === "sent" && (
                        <DropdownMenuItem
                          onClick={() => markAsPaid.mutate({ workspaceId: workspace.id, id: invoice.id })}
                        >
                          <Check className="size-4 mr-2" />
                          Markera som betald
                        </DropdownMenuItem>
                      )}
                      {invoice.status === "draft" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => deleteInvoice.mutate({ workspaceId: workspace.id, id: invoice.id })}
                          >
                            <Trash className="size-4 mr-2" />
                            Ta bort
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <CreateInvoiceDialog
        workspaceId={workspace.id}
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </div>
  );
}
