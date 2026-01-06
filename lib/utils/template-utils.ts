import type {
  VerificationTemplate,
  ScaledTransaction,
} from "@/lib/types/templates";

const BASE_AMOUNT = 1000;

/**
 * Scale template transactions based on user input amount
 * Optionally override the payment account (default: 1930)
 */
export function applyTemplateAmount(
  template: VerificationTemplate,
  amount: number,
  paymentAccount?: { number: number; name: string }
): ScaledTransaction[] {
  if (!template.transactions || template.transactions.length === 0) {
    return [];
  }

  return template.transactions.map((t) => {
    const scaledDebit = t.debit > 0 ? (t.debit / BASE_AMOUNT) * amount : 0;
    const scaledCredit = t.credit > 0 ? (t.credit / BASE_AMOUNT) * amount : 0;

    // Override payment account if provided (typically 1930, 1910, etc.)
    const isPaymentAccount = t.account === 1930 || t.account === 1910 || t.account === 1920;
    const accountNumber = paymentAccount && isPaymentAccount ? paymentAccount.number : t.account;
    const accountName = paymentAccount && isPaymentAccount ? paymentAccount.name : t.accountName;

    return {
      accountNumber,
      accountName,
      debit: scaledDebit > 0 ? Math.round(scaledDebit * 100) / 100 : undefined,
      credit: scaledCredit > 0 ? Math.round(scaledCredit * 100) / 100 : undefined,
    };
  });
}

/**
 * Search templates by name or description
 */
export function searchTemplates(
  templates: VerificationTemplate[],
  query: string
): VerificationTemplate[] {
  if (!query.trim()) {
    return templates;
  }

  const lowerQuery = query.toLowerCase();

  return templates.filter((t) => {
    const nameMatch = t.name.toLowerCase().includes(lowerQuery);
    const descriptionMatch = t.description.toLowerCase().includes(lowerQuery);
    return nameMatch || descriptionMatch;
  });
}

/**
 * Filter templates by direction (In = expense, Out = income)
 */
export function getTemplatesByDirection(
  templates: VerificationTemplate[],
  direction: "In" | "Out" | "all"
): VerificationTemplate[] {
  if (direction === "all") {
    return templates;
  }

  return templates.filter((t) => {
    if (direction === "In") {
      return t.direction === "In" || t.direction === "InShowAll";
    }
    return t.direction === "Out" || t.direction === "OutShowAll";
  });
}

/**
 * Get templates that have valid transactions
 */
export function getValidTemplates(
  templates: VerificationTemplate[]
): VerificationTemplate[] {
  return templates.filter((t) => t.transactions && t.transactions.length > 0);
}

/**
 * Group templates by category
 */
export function groupTemplatesByCategory(
  templates: VerificationTemplate[],
  categories: string[]
): Map<string, VerificationTemplate[]> {
  const grouped = new Map<string, VerificationTemplate[]>();

  for (const category of categories) {
    const categoryTemplates = templates.filter((t) =>
      t.categories.includes(category)
    );
    if (categoryTemplates.length > 0) {
      grouped.set(category, categoryTemplates);
    }
  }

  return grouped;
}

/**
 * Common payment accounts for Swedish companies
 */
export const PAYMENT_ACCOUNTS = [
  { number: 1930, name: "Företagskonto / affärskonto" },
  { number: 1910, name: "Kassa" },
  { number: 1920, name: "PlusGiro" },
  { number: 1940, name: "Bank, övriga bankkonton" },
  { number: 2440, name: "Leverantörsskulder" },
] as const;
