import { z } from "zod";

export const verificationSchema = z.object({
  office: z.string().optional().nullable(),
  accountingDate: z.string().date().optional().nullable(),
  ledgerDate: z.string().date().optional().nullable(),
  currencyDate: z.string().date().optional().nullable(),
  reference: z.string().optional().nullable(),
  amount: z.number().optional().nullable(),
  bookedBalance: z.number().optional().nullable(),
});

export const createVerificationsSchema = z.object({
  fiscalPeriodId: z.string().min(1, "Period krävs"),
  verifications: z
    .array(verificationSchema)
    .min(1, "Minst en verifikation krävs")
    .max(50, "Max 50 verifikationer åt gången"),
});

export const updateVerificationSchema = verificationSchema;

export type VerificationInput = z.infer<typeof verificationSchema>;
export type CreateVerificationsInput = z.infer<typeof createVerificationsSchema>;
export type UpdateVerificationInput = z.infer<typeof updateVerificationSchema>;
