/**
 * Modelos de dados para despesas do aplicativo Pato.
 * Define as estruturas utilizadas em toda a aplicação.
 */

/**
 * Categorias disponíveis para classificação de despesas.
 */
export enum ExpenseCategory {
  ALIMENTACAO = 'ALIMENTACAO',
  TRANSPORTE = 'TRANSPORTE',
  SAUDE = 'SAUDE',
  EDUCACAO = 'EDUCACAO',
  LAZER = 'LAZER',
  MORADIA = 'MORADIA',
  VESTUARIO = 'VESTUARIO',
  OUTROS = 'OUTROS',
}

/**
 * Mapeamento das categorias para rótulos em português.
 */
export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.ALIMENTACAO]: 'Alimentação',
  [ExpenseCategory.TRANSPORTE]: 'Transporte',
  [ExpenseCategory.SAUDE]: 'Saúde',
  [ExpenseCategory.EDUCACAO]: 'Educação',
  [ExpenseCategory.LAZER]: 'Lazer',
  [ExpenseCategory.MORADIA]: 'Moradia',
  [ExpenseCategory.VESTUARIO]: 'Vestuário',
  [ExpenseCategory.OUTROS]: 'Outros',
};

/**
 * Modelo completo de uma despesa, incluindo identificador único.
 */
export interface ExpenseModel {
  /** Identificador único da despesa */
  id: number;
  /** Descrição da despesa */
  descricao: string;
  /** Valor monetário da despesa */
  valor: number;
  /** Data da despesa no formato YYYY-MM-DD */
  data: string;
  /** Categoria da despesa */
  categoria: ExpenseCategory;
  /** Observações adicionais (opcional) */
  observacoes?: string;
}

/**
 * Modelo para criação de uma nova despesa (sem id).
 */
export interface CreateExpenseModel {
  /** Descrição da despesa */
  descricao: string;
  /** Valor monetário da despesa */
  valor: number;
  /** Data da despesa no formato YYYY-MM-DD */
  data: string;
  /** Categoria da despesa */
  categoria: ExpenseCategory;
  /** Observações adicionais (opcional) */
  observacoes?: string;
}

/**
 * Modelo de filtros para listagem de despesas.
 */
export interface ExpenseFilterModel {
  /** Data inicial do intervalo de busca (formato YYYY-MM-DD) */
  dataInicio?: string;
  /** Data final do intervalo de busca (formato YYYY-MM-DD) */
  dataFim?: string;
  /** Categoria para filtrar */
  categoria?: ExpenseCategory;
  /** Valor mínimo para filtrar */
  valorMinimo?: number;
  /** Valor máximo para filtrar */
  valorMaximo?: number;
}
