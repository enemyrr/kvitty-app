import * as fs from "fs";
import * as path from "path";

const BOKIO_WORKSPACE_ID = process.env.BOKIO_WORKSPACE_ID;
const BOKIO_COOKIES = process.env.BOKIO_COOKIES;
const LIMIT = process.argv.includes("--test") ? 1 : parseInt(process.env.LIMIT || "0") || Infinity;

if (!BOKIO_WORKSPACE_ID || !BOKIO_COOKIES) {
  console.error("Missing required environment variables:");
  console.error("  BOKIO_WORKSPACE_ID - Your Bokio workspace GUID");
  console.error("  BOKIO_COOKIES - Session cookies from browser");
  console.error("\nUsage:");
  console.error(
    '  BOKIO_WORKSPACE_ID="65c55567-..." BOKIO_COOKIES="bokiosession=..." pnpm tsx scripts/fetch-bokio-templates.ts'
  );
  console.error("\nOptions:");
  console.error("  --test     Fetch only 1 template (for testing)");
  console.error("  LIMIT=N    Fetch only N templates");
  process.exit(1);
}

interface Template {
  Id: string;
  Name: string;
  Description: string;
  FixedName: string;
  VatPercentage: number | null;
  IsPublic: boolean;
  Direction: string;
  CategoryList: string[];
  AliasNames: string | null;
  IsCustom: boolean;
}

interface Transaction {
  Account: number;
  AccountName: string;
  Debet: number;
  Credit: number;
}

interface EnrichedTemplate extends Template {
  Transactions?: Transaction[];
  FetchError?: string;
}

interface TemplateData {
  Data: {
    Categories: string[];
    Matches: Template[];
  };
}

interface BokioResponse {
  Data?: {
    Verification?: {
      Transactions?: Array<{
        Account: number;
        AccountName: string;
        Debet: number;
        Credit: number;
        Id: number;
      }>;
    };
  };
  Success: boolean;
  ErrorMessage?: string;
}

const API_URL = `https://app.bokio.se/${BOKIO_WORKSPACE_ID}/Accounting/RegisterRecipe/MultiRecipePreview`;

async function fetchTemplateTransactions(
  template: Template
): Promise<Transaction[] | null> {
  const payload = {
    RecipePreviews: [
      {
        RecipeId: template.Id,
        Values: {
          $Amount: "1000",
          $PaymentDate: new Date().toISOString().split("T")[0],
          $Account1: "1930",
          $Title: template.Name,
        },
      },
    ],
    AllowDraft: false,
    OverrideOriginal: [],
    IsVatFree: false,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: BOKIO_COOKIES!,
      Accept: "application/json, */*",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
  }

  const data = (await response.json()) as BokioResponse;

  if (!data.Success) {
    throw new Error(data.ErrorMessage || "Unknown API error");
  }

  const transactions = data.Data?.Verification?.Transactions;
  if (!transactions) {
    return null;
  }

  return transactions.map((t) => ({
    Account: t.Account,
    AccountName: t.AccountName,
    Debet: t.Debet,
    Credit: t.Credit,
  }));
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const inputPath = path.join(
    process.cwd(),
    "public",
    "template_verification.json"
  );
  const outputPath = path.join(
    process.cwd(),
    "public",
    "template_verification_enriched.json"
  );

  console.log("Reading template file...");
  const inputData = JSON.parse(
    fs.readFileSync(inputPath, "utf-8")
  ) as TemplateData;
  const templates = inputData.Data.Matches;

  const templatesToProcess = templates.slice(0, LIMIT);
  console.log(`Found ${templates.length} templates, processing ${templatesToProcess.length}${LIMIT < Infinity ? " (limited)" : ""}\n`);

  const enrichedTemplates: EnrichedTemplate[] = [];
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < templatesToProcess.length; i++) {
    const template = templatesToProcess[i];
    const progress = `[${i + 1}/${templatesToProcess.length}]`;

    process.stdout.write(`${progress} ${template.FixedName}... `);

    try {
      const transactions = await fetchTemplateTransactions(template);

      if (transactions) {
        enrichedTemplates.push({
          ...template,
          Transactions: transactions,
        });
        console.log(`✓ (${transactions.length} transactions)`);
        successCount++;
      } else {
        enrichedTemplates.push({
          ...template,
          FetchError: "No transactions returned",
        });
        console.log("⚠ No transactions");
        errorCount++;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      enrichedTemplates.push({
        ...template,
        FetchError: errorMessage,
      });
      console.log(`✗ ${errorMessage}`);
      errorCount++;
    }

    // Rate limiting: 150ms between requests
    if (i < templatesToProcess.length - 1) {
      await sleep(150);
    }
  }

  const outputData = {
    Data: {
      Categories: inputData.Data.Categories,
      Matches: enrichedTemplates,
    },
    _meta: {
      fetchedAt: new Date().toISOString(),
      baseAmount: 1000,
      totalTemplates: templates.length,
      processedTemplates: templatesToProcess.length,
      successCount,
      errorCount,
    },
  };

  console.log("\nWriting enriched data...");
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

  console.log(`\nDone!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors: ${errorCount}`);
  console.log(`  Output: ${outputPath}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
