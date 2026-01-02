import { z } from "zod";

export const invoiceLineSchema = z.object({
  description: z.string().min(1, "Beskrivning krävs"),
  quantity: z.number().min(0.01, "Antal måste vara minst 0.01"),
  unitPrice: z.number().min(0, "Pris måste vara minst 0"),
  vatRate: z.number().refine((v) => [0, 6, 12, 25].includes(v), "Ogiltig momssats"),
});

export const createInvoiceSchema = z.object({
  customerId: z.string().min(1, "Kund krävs"),
  fiscalPeriodId: z.string().optional(),
  invoiceDate: z.string().date("Ogiltigt fakturadatum"),
  dueDate: z.string().date("Ogiltigt förfallodatum"),
  reference: z.string().max(50).optional(),
  lines: z.array(invoiceLineSchema).min(1, "Minst en rad krävs"),
});

export const updateInvoiceSchema = createInvoiceSchema.extend({
  id: z.string(),
});

export type InvoiceLineInput = z.infer<typeof invoiceLineSchema>;
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;
