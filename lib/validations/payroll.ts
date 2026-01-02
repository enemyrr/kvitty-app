import { z } from "zod";

export const payrollRunStatuses = [
  "draft",
  "calculated",
  "approved",
  "paid",
  "reported",
] as const;
export type PayrollRunStatus = (typeof payrollRunStatuses)[number];

export const createPayrollRunSchema = z.object({
  workspaceId: z.string(),
  fiscalPeriodId: z.string(),
  period: z
    .string()
    .regex(/^\d{6}$/, "Period måste vara i format YYYYMM"),
  paymentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Ogiltigt datumformat"),
});

export const payrollEntrySchema = z.object({
  employeeId: z.string(),
  grossSalary: z.number().min(0, "Bruttolön måste vara positiv"),
  benefitsCar: z.number().min(0).default(0),
  benefitsOther: z.number().min(0).default(0),
  otherExpenses: z.number().min(0).default(0),
  workplaceAddress: z.string().max(200).optional(),
  workplaceCity: z.string().max(100).optional(),
});

export const addPayrollEntrySchema = z.object({
  payrollRunId: z.string(),
  entry: payrollEntrySchema,
});

export const updatePayrollEntrySchema = z.object({
  id: z.string(),
  grossSalary: z.number().min(0).optional(),
  benefitsCar: z.number().min(0).optional(),
  benefitsOther: z.number().min(0).optional(),
  otherExpenses: z.number().min(0).optional(),
  workplaceAddress: z.string().max(200).optional().nullable(),
  workplaceCity: z.string().max(100).optional().nullable(),
});

export const calculatePayrollSchema = z.object({
  payrollRunId: z.string(),
});

export const approvePayrollSchema = z.object({
  payrollRunId: z.string(),
});

export const generateAGISchema = z.object({
  payrollRunId: z.string(),
});

export type CreatePayrollRunInput = z.infer<typeof createPayrollRunSchema>;
export type PayrollEntryInput = z.infer<typeof payrollEntrySchema>;
export type AddPayrollEntryInput = z.infer<typeof addPayrollEntrySchema>;
export type UpdatePayrollEntryInput = z.infer<typeof updatePayrollEntrySchema>;
