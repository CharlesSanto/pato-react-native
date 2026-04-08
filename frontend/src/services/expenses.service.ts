/**
 * Serviço HTTP para comunicação com o backend do aplicativo Pato.
 * Realiza operações CRUD de despesas via API REST.
 */

import Constants from 'expo-constants';
import { Platform } from 'react-native';
import {
  CreateExpenseModel,
  ExpenseFilterModel,
  ExpenseModel,
} from '../models/expense.model';

const hostUri = Constants.expoConfig?.hostUri?.split(':').shift();

/** URL base padrão para Android emulator */
const ANDROID_API_URL = 'http://10.0.2.2:3000/api';
/** URL base padrão para iOS simulador e web */
const DEFAULT_API_URL = 'http://localhost:3000/api';
/** URL base da API do backend (configurável via EXPO_PUBLIC_API_BASE_URL) */
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  (Platform.OS === 'web'
    ? DEFAULT_API_URL
    : hostUri 
      ? `http://${hostUri}:3000/api` 
      : DEFAULT_API_URL);

/**
 * Formato de resposta encapsulada retornada pelo backend.
 * @template T Tipo dos dados em caso de sucesso
 */
interface ResultadoAPI<T> {
  sucesso: boolean;
  dados?: T;
  erro?: string;
}

/**
 * Trata respostas do backend, desencapsulando os dados ou lançando erro descritivo.
 * @param response - Resposta da requisição fetch
 * @returns Dados desencapsulados em caso de sucesso
 */
async function processarResposta<T>(response: Response): Promise<T> {
  let corpo: ResultadoAPI<T>;
  try {
    corpo = (await response.json()) as ResultadoAPI<T>;
  } catch {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  if (!response.ok || !corpo.sucesso) {
    throw new Error(corpo.erro ?? `Erro HTTP ${response.status}`);
  }

  return corpo.dados as T;
}

/**
 * Lista todas as despesas, com filtros opcionais.
 * @param filtro - Parâmetros de filtro opcionais
 * @returns Lista de despesas
 */
export async function listarDespesas(
  filtro?: ExpenseFilterModel
): Promise<ExpenseModel[]> {
  const params = new URLSearchParams();

  if (filtro) {
    if (filtro.dataInicio) params.append('dataInicio', filtro.dataInicio);
    if (filtro.dataFim) params.append('dataFim', filtro.dataFim);
    if (filtro.categoria) params.append('categoria', filtro.categoria);
    if (filtro.valorMinimo !== undefined)
      params.append('valorMinimo', String(filtro.valorMinimo));
    if (filtro.valorMaximo !== undefined)
      params.append('valorMaximo', String(filtro.valorMaximo));
  }

  const queryString = params.toString();
  const url = queryString
    ? `${API_BASE_URL}/despesas?${queryString}`
    : `${API_BASE_URL}/despesas`;

  const response = await fetch(url);
  return processarResposta<ExpenseModel[]>(response);
}

/**
 * Obtém uma despesa pelo seu identificador.
 * @param id - Identificador único da despesa
 * @returns Despesa encontrada
 */
export async function obterDespesaPorId(id: number): Promise<ExpenseModel> {
  const response = await fetch(`${API_BASE_URL}/despesas/${id}`);
  return processarResposta<ExpenseModel>(response);
}

/**
 * Cria uma nova despesa no backend.
 * @param despesa - Dados da despesa a ser criada
 * @returns Despesa criada com o id gerado
 */
export async function criarDespesa(
  despesa: CreateExpenseModel
): Promise<ExpenseModel> {
  const response = await fetch(`${API_BASE_URL}/despesas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(despesa),
  });
  return processarResposta<ExpenseModel>(response);
}

/**
 * Atualiza uma despesa existente.
 * @param id - Identificador da despesa a atualizar
 * @param dados - Campos a serem atualizados
 * @returns Despesa atualizada
 */
export async function atualizarDespesa(
  id: number,
  dados: Partial<CreateExpenseModel>
): Promise<ExpenseModel> {
  const response = await fetch(`${API_BASE_URL}/despesas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return processarResposta<ExpenseModel>(response);
}

/**
 * Exclui uma despesa pelo seu identificador.
 * @param id - Identificador da despesa a excluir
 */
export async function excluirDespesa(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/despesas/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    await processarResposta<void>(response);
  }
}
