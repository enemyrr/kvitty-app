import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Lock, Calendar } from "@phosphor-icons/react/dist/ssr";
import { format } from "date-fns";
import { sv } from "date-fns/locale/sv";

interface LockedMonth {
  id: string;
  month: string;
  lockedByUser: {
    name: string | null;
    email: string;
  };
}

interface Period {
  id: string;
  label: string;
  urlSlug: string;
  startDate: string;
  endDate: string;
  lockedMonths: LockedMonth[];
  lockedMonthsCount: number;
  isPartiallyLocked: boolean;
  isFullyLocked: boolean;
  totalMonths: number;
}

interface PeriodsTableProps {
  periods: Period[];
  workspaceSlug: string;
}

export function PeriodsTable({ periods, workspaceSlug }: PeriodsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Period</TableHead>
          <TableHead>Startdatum</TableHead>
          <TableHead>Slutdatum</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Låsta månader</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {periods.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              Inga perioder hittades
            </TableCell>
          </TableRow>
        ) : (
          periods.map((period) => (
            <TableRow key={period.id}>
              <TableCell>
                <Link
                  href={`/${workspaceSlug}/${period.urlSlug}`}
                  className="font-medium hover:underline"
                >
                  {period.label}
                </Link>
              </TableCell>
              <TableCell>
                {format(new Date(period.startDate), "d MMM yyyy", {
                  locale: sv,
                })}
              </TableCell>
              <TableCell>
                {format(new Date(period.endDate), "d MMM yyyy", {
                  locale: sv,
                })}
              </TableCell>
              <TableCell>
                {period.isFullyLocked ? (
                  <Badge variant="destructive" className="gap-1">
                    <Lock className="size-3" />
                    Låst
                  </Badge>
                ) : period.isPartiallyLocked ? (
                  <Badge variant="outline" className="gap-1">
                    <Lock className="size-3" />
                    Delvis låst
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="size-3" />
                    Öppen
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {period.lockedMonthsCount > 0 ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">
                      {period.lockedMonthsCount} av {period.totalMonths} månader
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {period.lockedMonths.map((locked) => (
                        <Badge
                          key={locked.id}
                          variant="outline"
                          className="text-xs"
                        >
                          {format(new Date(`${locked.month}-01`), "MMM yyyy", {
                            locale: sv,
                          })}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Inga låsta månader
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

