import { z } from "zod";

export const createBankAccountSchema = z.object({
  workspaceId: z.string(),
  accountNumber: z
    .number()
    .int()
    .min(1000, "Kontonummer måste vara minst 4 siffror")
    .max(9999, "Kontonummer får max vara 4 siffror"),
  name: z
    .string()
    .min(1, "Namn krävs")
    .max(100, "Namn får max vara 100 tecken"),
  description: z.string().max(500).optional(),
  isDefault: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export const updateBankAccountSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Namn krävs")
    .max(100, "Namn får max vara 100 tecken")
    .optional(),
  description: z.string().max(500).optional().nullable(),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export type CreateBankAccountInput = z.infer<typeof createBankAccountSchema>;
export type UpdateBankAccountInput = z.infer<typeof updateBankAccountSchema>;
