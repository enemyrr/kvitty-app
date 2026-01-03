import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { salaryStatements, payrollEntries, payrollRuns, workspaceMembers } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ statementId: string }> }
) {
  const { statementId } = await params;

  // Security: Verify user session
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get the salary statement with related payroll data
    const statement = await db.query.salaryStatements.findFirst({
      where: eq(salaryStatements.id, statementId),
      with: {
        payrollEntry: {
          with: {
            payrollRun: true,
          },
        },
      },
    });

    if (!statement) {
      return NextResponse.json({ error: "Statement not found" }, { status: 404 });
    }

    if (!statement.pdfUrl) {
      return NextResponse.json({ error: "PDF not available" }, { status: 404 });
    }

    // Security: Verify user is member of the workspace
    const workspaceId = statement.payrollEntry.payrollRun.workspaceId;
    const membership = await db.query.workspaceMembers.findFirst({
      where: and(
        eq(workspaceMembers.workspaceId, workspaceId),
        eq(workspaceMembers.userId, session.user.id)
      ),
    });

    if (!membership) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Redirect to the blob URL
    // The URL has a random suffix making it unguessable without access to this route
    return NextResponse.redirect(statement.pdfUrl);
  } catch (error) {
    console.error("[Salary Statement Download] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
