/**
 * Serviço HTTP para comunicação com o backend do aplicativo Pato.
 * Realiza operações CRUD de despesas via API REST.
 */

import Constants from "expo-constants";
import { Platform } from "react-native";
import {
  CreateExpenseModel,
  ExpenseFilterModel,
  ExpenseModel,
} from "../models/expense.model";

const hostUri = Constants.expoConfig?.hostUri?.split(":").shift();

/** URL base padrão para Android emulator */
const ANDROID_API_URL = "http://10.0.2.2:3000/api";
/** URL base padrão para iOS simulador e web */
const DEFAULT_API_URL = "http://localhost:3000/api";
/** URL base da API do backend (configurável via EXPO_PUBLIC_API_BASE_URL) */
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  (Platform.OS === "web"
    ? DEFAULT_API_URL
    : hostUri
      ? `http://${hostUri}:3000/api`
      : DEFAULT_API_URL);

/**
 * Formato de resposta encapsulada retornada pelo backend.
 * @template T Tipo dos dados em caso de sucesso
 */
interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Trata respostas do backend, desencapsulando os dados ou lançando erro descritivo.
 * @param response - Resposta da requisição fetch
 * @returns Dados desencapsulados em caso de sucesso
 */
async function processResponse<T>(response: Response): Promise<T> {
  let body: Result<T>;
  try {
    body = (await response.json()) as Result<T>;
  } catch {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  if (!response.ok || !body.success) {
    throw new Error(body.error ?? `Erro HTTP ${response.status}`);
  }

  return body.data as T;
}

/**
 * Lista todas as despesas, com filtros opcionais.
 * @param filter - Parâmetros de filtro opcionais
 * @returns Lista de despesas
 */
export async function listExpenses(
  filter?: ExpenseFilterModel,
): Promise<ExpenseModel[]> {
  const params = new URLSearchParams();

  if (filter) {
    if (filter.startDate) params.append("dataInicio", filter.startDate);
    if (filter.endDate) params.append("dataFim", filter.endDate);
    if (filter.category) params.append("categoria", filter.category);
    if (filter.minValue !== undefined)
      params.append("valorMinimo", String(filter.minValue));
    if (filter.maxValue !== undefined)
      params.append("valorMaximo", String(filter.maxValue));
  }

  const queryString = params.toString();
  const url = queryString
    ? `${API_BASE_URL}/expenses?${queryString}`
    : `${API_BASE_URL}/expenses`;

  const response = await fetch(url);
  return processResponse<ExpenseModel[]>(response);
}

/**
 * Obtém uma despesa pelo seu identificador.
 * @param id - Identificador único da despesa
 * @returns Despesa encontrada
 */
export async function getExpenseById(id: number): Promise<ExpenseModel> {
  const response = await fetch(`${API_BASE_URL}/despesas/${id}`);
  return processResponse<ExpenseModel>(response);
}

/**
 * Cria uma nova despesa no backend.
 * @param expense - Dados da despesa a ser criada
 * @returns Despesa criada com o id gerado
 */
export async function createExpense(
  expense: CreateExpenseModel,
): Promise<ExpenseModel> {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return processResponse<ExpenseModel>(response);
}

/**
 * Atualiza uma despesa existente.
 * @param id - Identificador da despesa a atualizar
 * @param data - Campos a serem atualizados
 * @returns Despesa atualizada
 */
export async function updateExpense(
  id: number,
  data: Partial<CreateExpenseModel>,
): Promise<ExpenseModel> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return processResponse<ExpenseModel>(response);
}

/**
 * Exclui uma despesa pelo seu identificador.
 * @param id - Identificador da despesa a excluir
 */
export async function deleteExpenses(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    await processResponse<void>(response);
  }
}
