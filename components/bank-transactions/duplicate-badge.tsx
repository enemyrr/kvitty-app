"use client";

import { Warning, Copy } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import type { DuplicateMatch } from "@/hooks/use-duplicate-check";

interface DuplicateBadgeProps {
  matches: DuplicateMatch[];
}

export function DuplicateBadge({ matches }: DuplicateBadgeProps) {
  if (matches.length === 0) {
    return null;
  }

  const dbMatches = matches.filter((m) => m.type === "database");
  const batchMatches = matches.filter((m) => m.type === "batch");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200 cursor-help h-5 gap-1 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
        >
          <Warning className="size-3" weight="fill" />
          <span className="text-xs">Dubblett</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-sm bg-background text-foreground border p-3">
        <div className="space-y-3 text-xs">
          {dbMatches.length > 0 && (
            <div className="space-y-2">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Warning className="size-3.5" weight="fill" />
                Finns redan i databasen
              </div>
              <div className="space-y-1.5 pl-4.5">
                {dbMatches.slice(0, 3).map((match, i) => (
                  <div key={i} className="text-muted-foreground leading-relaxed space-y-0.5">
                    <div className="font-medium text-foreground">
                      {format(new Date(match.accountingDate), "yyyy-MM-dd")}
                    </div>
                    <div className="font-medium text-foreground">
                      {parseFloat(match.amount).toLocaleString("sv-SE", {
                        style: "currency",
                        currency: "SEK",
                      })}
                    </div>
                    {match.reference && (
                      <div className="text-muted-foreground/80 truncate max-w-[240px]">
                        {match.reference}
                      </div>
                    )}
                  </div>
                ))}
                {dbMatches.length > 3 && (
                  <div className="text-muted-foreground/70 pt-0.5">
                    +{dbMatches.length - 3} fler...
                  </div>
                )}
              </div>
            </div>
          )}

          {dbMatches.length > 0 && batchMatches.length > 0 && (
            <div className="border-t border-border" />
          )}

          {batchMatches.length > 0 && (
            <div className="space-y-1.5">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Copy className="size-3.5" weight="fill" />
                Dubbletter i denna batch
              </div>
              <div className="text-muted-foreground pl-4.5 leading-relaxed">
                En annan rad har samma datum och belopp
              </div>
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
