"use client";

import { createContext, useContext } from "react";
import type { workspaces, fiscalPeriods } from "@/lib/db/schema";

type Workspace = typeof workspaces.$inferSelect;
type FiscalPeriod = typeof fiscalPeriods.$inferSelect;

interface WorkspaceContextValue {
  workspace: Workspace;
  periods: FiscalPeriod[];
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({
  children,
  workspace,
  periods,
}: {
  children: React.ReactNode;
  workspace: Workspace;
  periods: FiscalPeriod[];
}) {
  return (
    <WorkspaceContext.Provider value={{ workspace, periods }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
