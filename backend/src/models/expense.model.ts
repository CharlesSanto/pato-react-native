/**
 * @file expense.model.ts
 * @description Modelos e interfaces para o domínio de despesas do aplicativo Pato.
 */

/**
 * Categorias disponíveis para classificação de despesas.
 */
export enum ExpenseCategory {
  /** Gastos com alimentação e refeições */
  ALIMENTACAO = "ALIMENTACAO",
  /** Gastos com transporte e locomoção */
  TRANSPORTE = "TRANSPORTE",
  /** Gastos com saúde e bem-estar */
  SAUDE = "SAUDE",
  /** Gastos com educação e cursos */
  EDUCACAO = "EDUCACAO",
  /** Gastos com lazer e entretenimento */
  LAZER = "LAZER",
  /** Gastos com moradia e habitação */
  MORADIA = "MORADIA",
  /** Gastos com vestuário e acessórios */
  VESTUARIO = "VESTUARIO",
  /** Outros gastos não classificados */
  OUTROS = "OUTROS",
}

/**
 * Representa uma despesa completa no sistema, incluindo identificador.
 */
export interface ExpenseModel {
  /** Identificador único da despesa */
  id: number;
  /** Descrição resumida da despesa */
  descricao: string;
  /** Valor monetário da despesa */
  valor: number;
  /** Data da despesa em formato ISO 8601 (ex: "2024-01-15") */
  data: string;
  /** Categoria à qual a despesa pertence */
  categoria: ExpenseCategory;
  /** Observações adicionais sobre a despesa (opcional) */
  observacoes?: string;
}

/**
 * Dados necessários para criar uma nova despesa (sem id, gerado automaticamente).
 */
export interface CreateExpenseModel {
  /** Descrição resumida da despesa */
  descricao: string;
  /** Valor monetário da despesa */
  valor: number;
  /** Data da despesa em formato ISO 8601 (ex: "2024-01-15") */
  data: string;
  /** Categoria à qual a despesa pertence */
  categoria: ExpenseCategory;
  /** Observações adicionais sobre a despesa (opcional) */
  observacoes?: string;
}

/**
 * Dados para atualização parcial de uma despesa existente.
 * Todos os campos são opcionais — apenas os fornecidos serão atualizados.
 */
export interface UpdateExpenseModel {
  /** Nova descrição da despesa */
  descricao?: string;
  /** Novo valor monetário da despesa */
  valor?: number;
  /** Nova data da despesa em formato ISO 8601 */
  data?: string;
  /** Nova categoria da despesa */
  categoria?: ExpenseCategory;
  /** Novas observações sobre a despesa */
  observacoes?: string;
}

/**
 * Filtros opcionais para listagem de despesas.
 */
export interface ExpenseFilterModel {
  /** Data inicial do período de busca (formato ISO 8601) */
  dataInicio?: string;
  /** Data final do período de busca (formato ISO 8601) */
  dataFim?: string;
  /** Categoria para filtrar */
  categoria?: ExpenseCategory;
  /** Valor mínimo das despesas retornadas */
  valorMinimo?: number;
  /** Valor máximo das despesas retornadas */
  valorMaximo?: number;
}

/**
 * Códigos de erro padronizados para operações do sistema.
 * Permitem tratamento condicional sem depender de correspondência de strings.
 */
export enum ErrorCode {
  /** Recurso não encontrado no banco de dados */
  NAO_ENCONTRADO = "NAO_ENCONTRADO",
  /** Erro interno ou inesperado durante a operação */
  ERRO_INTERNO = "ERRO_INTERNO",
}

/**
 * Envelope genérico de resultado para operações do sistema.
 * Encapsula o sucesso ou falha de uma operação juntamente com os dados ou mensagem de erro.
 * @template T Tipo dos dados retornados em caso de sucesso
 */
export interface Result<T> {
  /** Indica se a operação foi bem-sucedida */
  sucesso: boolean;
  /** Dados retornados em caso de sucesso */
  dados?: T;
  /** Mensagem de erro legível em caso de falha */
  erro?: string;
  /** Código de erro estruturado para tratamento programático */
  codigoErro?: ErrorCode;
}
