import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Namn krävs").max(100, "Namn får max vara 100 tecken"),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(1, "Namn krävs").max(100, "Namn får max vara 100 tecken"),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
