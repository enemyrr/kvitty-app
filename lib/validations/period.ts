import { z } from "zod";

export const createPeriodSchema = z.object({
  label: z.string().min(1, "Etikett krävs").max(50, "Etikett får max vara 50 tecken"),
  urlSlug: z
    .string()
    .min(1, "URL krävs")
    .max(20, "URL får max vara 20 tecken")
    .regex(/^[a-z0-9-]+$/, "URL får bara innehålla a-z, 0-9 och bindestreck"),
  startDate: z.string().date("Ogiltigt startdatum"),
  endDate: z.string().date("Ogiltigt slutdatum"),
}).refine((data) => new Date(data.startDate) < new Date(data.endDate), {
  message: "Startdatum måste vara före slutdatum",
  path: ["endDate"],
});

export const updatePeriodSchema = createPeriodSchema;

export type CreatePeriodInput = z.infer<typeof createPeriodSchema>;
export type UpdatePeriodInput = z.infer<typeof updatePeriodSchema>;
