"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Swap, CalendarBlank } from "@phosphor-icons/react";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavPeriods({
  workspaceSlug,
  onAddVerification,
  isFullMode = false,
}: {
  workspaceSlug: string;
  onAddVerification?: () => void;
  isFullMode?: boolean;
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{isFullMode ? "Bokföring" : "Transaktioner"}</SidebarGroupLabel>
      {isFullMode && (
        <SidebarGroupAction title="Ny verifikation" onClick={onAddVerification}>
          <Plus className="size-4" />
          <span className="sr-only">Ny verifikation</span>
        </SidebarGroupAction>
      )}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Transaktioner"
            isActive={pathname === `/${workspaceSlug}/transaktioner`}
          >
            <Link href={`/${workspaceSlug}/transaktioner`}>
              <Swap className="size-4" weight="duotone" />
              <span>Transaktioner</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {isFullMode && (
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Verifikationer"
              isActive={pathname === `/${workspaceSlug}/bokforing`}
            >
              <Link href={`/${workspaceSlug}/bokforing`}>
                <FileText className="size-4" weight="duotone" />
                <span>Verifikationer</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Perioder"
            isActive={pathname === `/${workspaceSlug}/perioder`}
          >
            <Link href={`/${workspaceSlug}/perioder`}>
              <CalendarBlank className="size-4" weight="duotone" />
              <span>Perioder</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
