// Swedish employer contribution rates (Arbetsgivaravgifter) for 2024/2025
// These rates are applied to the gross salary

export const EMPLOYER_CONTRIBUTION_RATES = {
  // Standard rate for employees born 1957 or later
  standard: 0.3142, // 31.42%

  // Reduced rate for employees born 1938-1956 (retirement age)
  retirement_age: 0.1021, // 10.21%

  // Employees born 1937 or earlier - no employer contributions
  born_before_1938: 0,
} as const;

// Individual contribution components (for reference)
export const CONTRIBUTION_COMPONENTS = {
  sjukforsakring: 0.0311, // Sjukförsäkringsavgift
  foraldraforsakring: 0.026, // Föräldraförsäkringsavgift
  alderspension: 0.1021, // Ålderspensionsavgift
  efterlevandepension: 0.006, // Efterlevandepensionsavgift
  arbetsmarknad: 0.0264, // Arbetsmarknadsavgift
  arbetsskada: 0.002, // Arbetsskadeavgift
  allman_loneavgift: 0.1206, // Allmän löneavgift
} as const;

// Get the correct employer contribution rate based on birth year
export function getEmployerContributionRate(birthYear: number): number {
  if (birthYear <= 1937) {
    return EMPLOYER_CONTRIBUTION_RATES.born_before_1938;
  }

  if (birthYear >= 1938 && birthYear <= 1956) {
    return EMPLOYER_CONTRIBUTION_RATES.retirement_age;
  }

  return EMPLOYER_CONTRIBUTION_RATES.standard;
}

// Calculate employer contributions for a given gross salary
export function calculateEmployerContributions(
  grossSalary: number,
  birthYear: number
): number {
  const rate = getEmployerContributionRate(birthYear);
  return Math.round(grossSalary * rate);
}

// Extract birth year from Swedish personal number (YYYYMMDDXXXX or YYMMDDXXXX)
export function extractBirthYear(personalNumber: string): number {
  const cleaned = personalNumber.replace(/\D/g, "");

  if (cleaned.length === 12) {
    return parseInt(cleaned.substring(0, 4), 10);
  }

  if (cleaned.length === 10) {
    const yearPart = parseInt(cleaned.substring(0, 2), 10);
    const currentYear = new Date().getFullYear();
    const currentCentury = Math.floor(currentYear / 100);

    // If the year would be in the future, assume previous century
    if (yearPart + currentCentury * 100 > currentYear) {
      return (currentCentury - 1) * 100 + yearPart;
    }
    return currentCentury * 100 + yearPart;
  }

  throw new Error("Invalid personal number format");
}
