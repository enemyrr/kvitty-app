import { db } from "@/lib/db";
import { workspaces, fiscalPeriods, verifications } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function WorkspaceDashboardPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;

  const workspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.slug, workspaceSlug),
  });

  if (!workspace) {
    return null;
  }

  const periods = await db.query.fiscalPeriods.findMany({
    where: eq(fiscalPeriods.workspaceId, workspace.id),
    orderBy: (periods, { desc }) => [desc(periods.startDate)],
  });

  // Get verification counts per period
  const periodStats = await Promise.all(
    periods.map(async (period) => {
      const [result] = await db
        .select({ count: count() })
        .from(verifications)
        .where(eq(verifications.fiscalPeriodId, period.id));
      return {
        ...period,
        verificationCount: result?.count || 0,
      };
    })
  );

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{workspace.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div>
          <h1 className="text-2xl font-bold">{workspace.name}</h1>
          <p className="text-muted-foreground text-sm">Översikt</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {periodStats.map((period) => (
            <Link key={period.id} href={`/${workspaceSlug}/${period.urlSlug}`}>
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{period.label}</CardTitle>
                  <CardDescription>
                    {period.startDate} — {period.endDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{period.verificationCount}</p>
                  <p className="text-muted-foreground text-sm">verifikationer</p>
                </CardContent>
              </Card>
            </Link>
          ))}

          {periods.length === 0 && (
            <Card className="border-dashed col-span-full">
              <CardHeader>
                <CardTitle className="text-lg">Ingen period</CardTitle>
                <CardDescription>
                  Skapa din första bokföringsperiod för att börja lägga till
                  verifikationer. Klicka på + i sidomenyn under
                  &quot;Verifikationer&quot;.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
