export interface TemplateTransaction {
  account: number;
  accountName: string;
  debit: number;
  credit: number;
}

export interface VerificationTemplate {
  id: string;
  name: string;
  description: string;
  direction: "In" | "Out" | "InShowAll" | "OutShowAll";
  categories: string[];
  transactions: TemplateTransaction[];
}

export interface TemplateData {
  categories: string[];
  templates: VerificationTemplate[];
  meta: {
    baseAmount: number;
    templateCount: number;
    generatedAt: string;
  };
}

export interface TemplateInputValues {
  amount: number;
  date: string;
  paymentAccount: number;
  paymentAccountName: string;
  title: string;
  comment?: string;
}

export interface ScaledTransaction {
  accountNumber: number;
  accountName: string;
  debit: number | undefined;
  credit: number | undefined;
}
