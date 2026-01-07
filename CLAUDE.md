# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kvitty is a Swedish bookkeeping and invoicing SaaS application. It supports both simple receipt tracking ("simple" mode) and full double-entry bookkeeping ("full_bookkeeping" mode) with payroll, invoicing, and AGI (Arbetsgivardeklaration) XML generation for Swedish tax reporting.

## Development Commands

```bash
pnpm dev              # Start development server
pnpm build            # Production build
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript type checking

# Database (Drizzle + PostgreSQL)
pnpm db:push          # Push schema changes to database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio
pnpm db:wipe          # Wipe database (scripts/wipe-db.ts)
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **API**: tRPC with React Query
- **Authentication**: better-auth (magic link, email OTP, Google OAuth)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **File Storage**: AWS S3 + CloudFront
- **AI**: Groq SDK with AI SDK

### Route Structure
- `app/(auth)/` - Authentication pages (login, signup, verify)
- `app/(dash)/` - Dashboard (requires auth)
  - `[workspaceSlug]/` - Workspace-scoped pages
    - `[periodSlug]/` - Fiscal period-scoped pages
- `app/(web)/` - Public marketing pages
- `app/api/auth/` - better-auth API routes
- `app/api/trpc/` - tRPC API handler

### Key Directories
- `lib/db/schema.ts` - Complete Drizzle schema with all tables and relations
- `lib/trpc/` - tRPC configuration and routers
  - `init.ts` - Context creation, `publicProcedure`, `protectedProcedure`, `workspaceProcedure`
  - `routers/` - Feature-specific routers (workspaces, invoices, payroll, etc.)
- `lib/validations/` - Zod schemas for input validation
- `lib/auth.ts` - Server-side better-auth configuration
- `lib/auth-client.ts` - Client-side auth hooks (`useSession`, `signIn`, `signOut`)
- `components/ui/` - shadcn/ui components

### Data Model
All business data is workspace-scoped. Key entities:
- **Workspaces**: Multi-tenant isolation with members/invites
- **FiscalPeriods**: Accounting years (calendar or broken)
- **JournalEntries/JournalEntryLines**: Double-entry bookkeeping (full mode)
- **Verifications**: Simple receipt tracking (simple mode)
- **Invoices/InvoiceLines/Customers/Products**: Invoicing system
- **Employees/PayrollRuns/PayrollEntries**: Payroll with AGI XML generation

### tRPC Pattern
Procedures use `workspaceProcedure` for workspace-scoped operations which validates membership:
```typescript
import { workspaceProcedure } from "../init";
// Input must include workspaceId, membership is automatically verified
```

### Table Pagination & URL State Pattern
All tables MUST have server-side pagination with URL state using `nuqs`. This ensures:
- Pagination state is shareable via URL
- Browser back/forward navigation works correctly
- Page refreshes maintain state

**URL State with nuqs:**
Always use `nuqs` for URL state management instead of `useState` or manual `useSearchParams`:
```typescript
import { useQueryState, parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs";

// Page number (integer)
const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

// String filter
const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));

// Enum/literal filter
const statusOptions = ["all", "draft", "sent", "paid"] as const;
const [status, setStatus] = useQueryState(
  "status",
  parseAsStringLiteral(statusOptions).withDefault("all")
);

// Reset page when filters change
const handleFilterChange = (value: string) => {
  setStatus(value);
  setPage(1); // Reset to page 1
};
```

**tRPC Router:**
```typescript
list: workspaceProcedure
  .input(z.object({
    limit: z.number().min(1).max(100).default(20),
    offset: z.number().min(0).default(0),
  }))
  .query(async ({ ctx, input }) => {
    const whereClause = eq(table.workspaceId, ctx.workspaceId);

    const [items, totalResult] = await Promise.all([
      ctx.db.query.table.findMany({
        where: whereClause,
        limit: input.limit,
        offset: input.offset,
      }),
      ctx.db.select({ count: count() }).from(table).where(whereClause),
    ]);

    return {
      items,
      total: totalResult[0]?.count ?? 0,
    };
  })
```

**Page Client:**
```typescript
import { useQueryState, parseAsInteger } from "nuqs";

const PAGE_SIZE = 20;

// URL state with nuqs
const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

const { data } = trpc.items.list.useQuery({
  workspaceId: workspace.id,
  limit: PAGE_SIZE,
  offset: (page - 1) * PAGE_SIZE,
});

const items = data?.items;
const total = data?.total ?? 0;
const totalPages = Math.ceil(total / PAGE_SIZE);
```

**Table Component:**
```typescript
interface TableProps {
  // ... other props
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

// Use the shared TablePagination component
import { TablePagination } from "@/components/ui/table-pagination";

<TablePagination
  page={page}
  totalPages={totalPages}
  total={total}
  pageSize={20}
  onPageChange={onPageChange}
  itemLabel="items"
/>
```

**IMPORTANT:** Never use `useState` for URL-related state like pagination, filters, or search. Always use `nuqs` to keep state in the URL.

### Environment Variables
See `.env.example` for required variables:
- `DATABASE_URL` - PostgreSQL connection
- `BETTER_AUTH_SECRET` - Auth encryption key
- `GOOGLE_CLIENT_ID/SECRET` - OAuth
- `GROQ_API_KEY` - AI features
- `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `CLOUDFRONT_DOMAIN` - File uploads

## Swedish Context

This is a Swedish accounting app. Key terminology:
- Faktura = Invoice
- Kund = Customer
- Produkt = Product
- Moms = VAT (25%, 12%, 6%, 0%)
- Verifikation = Accounting verification/voucher
- Räkenskapsår = Fiscal year
- Lön = Payroll/Salary
- AGI = Arbetsgivardeklaration (employer tax declaration)
- BAS-kontoplan = Swedish standard chart of accounts
