export enum ExpenseCategory {
  FOOD = "ALIMENTACAO",
  TRANSPORT = "TRANSPORTE",
  HEALTH = "SAUDE",
  EDUCATION = "EDUCACAO",
  LEISURE = "LAZER",
  HOUSING = "MORADIA",
  CLOTHING = "VESTUARIO",
  OTHER = "OUTROS",
}

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

export interface UpdateExpenseModel {
  description?: string;
  value?: number;
  date?: string;
  category?: ExpenseCategory;
  observations?: string;
}

export interface ExpenseFilterModel {
  startDate?: string;
  endDate?: string;
  category?: ExpenseCategory;
  minValue?: number;
  maxValue?: number;
}

export enum ErrorCode {
  NOT_FOUND = "NAO_ENCONTRATO",
  INTERNAL_ERROR = "ERRO_INTERNO",
}

export interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
  errorCode?: ErrorCode;
}