// change the identifier to english
export enum ExpenseCategory {
  FOOD = "ALIMENTACAO",
  TRANSPORT = "TRANSPORTE",
  HEALTH = "SAUDE",
  EDUCATION = "EDUCACAO",
  LEISURE = "LAZER",
  HOUSING = "MORADIA",
  CLOTHING = "VESTUARIO",
  OTHERS = "OUTROS",
}

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.FOOD]: "Alimentação",
  [ExpenseCategory.TRANSPORT]: "Transporte",
  [ExpenseCategory.HEALTH]: "Saúde",
  [ExpenseCategory.EDUCATION]: "Educação",
  [ExpenseCategory.LEISURE]: "Lazer",
  [ExpenseCategory.HOUSING]: "Moradia",
  [ExpenseCategory.CLOTHING]: "Vestuário",
  [ExpenseCategory.OTHERS]: "Outros",
};

export interface ExpenseModel {
  id: number;
  description: string;
  value: number;
  date: string;
  category: ExpenseCategory;
  observations?: string;
}

export interface CreateExpenseModel {
  description: string;
  value: number;
  date: string;
  category: ExpenseCategory;
  observations?: string;
}

export interface ExpenseFilterModel {
  startDate?: string;
  endDate?: string;
  category?: ExpenseCategory;
  minValue?: number;
  maxValue?: number;
}
