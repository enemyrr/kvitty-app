// Default bank accounts for new workspaces in full bookkeeping mode
export const defaultBankAccounts = [
  {
    accountNumber: 1630,
    name: "Skattekonto",
    description: "Konto hos Skatteverket för skatter och avgifter",
    isDefault: false,
    sortOrder: 0,
  },
  {
    accountNumber: 1920,
    name: "PlusGiro",
    description: "PlusGiro-konto",
    isDefault: false,
    sortOrder: 1,
  },
  {
    accountNumber: 1930,
    name: "Företagskonto",
    description: "Huvudsakligt företagskonto",
    isDefault: true,
    sortOrder: 2,
  },
  {
    accountNumber: 1931,
    name: "Företagskonto 2",
    description: "Sekundärt företagskonto",
    isDefault: false,
    sortOrder: 3,
  },
  {
    accountNumber: 2890,
    name: "Personalens källskatt",
    description: "Konto för personalens preliminärskatt",
    isDefault: false,
    sortOrder: 4,
  },
] as const;

// Common bank account numbers from BAS kontoplan
export const commonBankAccountNumbers = [
  1910, // Kassa
  1920, // PlusGiro
  1930, // Checkräkningskonto, affärskonto
  1931, // Checkräkningskonto, affärskonto 2
  1940, // Övriga bankkonton
  1950, // Bankcertifikat
  1960, // Koncernkonto hos moderföretag
  1970, // Särskilda bankkonton
  1630, // Skattekonto
] as const;
