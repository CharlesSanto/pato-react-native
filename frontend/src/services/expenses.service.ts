/**
 * Serviço HTTP para comunicação com o backend do aplicativo Pato.
 * Realiza operações CRUD de despesas via API REST.
 */

import {
  CreateExpenseModel,
  ExpenseFilterModel,
  ExpenseModel,
} from '../models/expense.model';

/** URL base da API do backend */
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Trata erros de resposta HTTP, lançando exceção com mensagem descritiva.
 * @param response - Resposta da requisição fetch
 */
async function tratarErroResposta(response: Response): Promise<never> {
  let mensagem = `Erro HTTP ${response.status}`;
  try {
    const corpo = await response.json();
    if (corpo.message) {
      mensagem = corpo.message;
    }
  } catch {
    // ignora erro ao ler o corpo
  }
  throw new Error(mensagem);
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
    ? `${API_BASE_URL}/expenses?${queryString}`
    : `${API_BASE_URL}/expenses`;

  const response = await fetch(url);
  if (!response.ok) await tratarErroResposta(response);
  return response.json() as Promise<ExpenseModel[]>;
}

/**
 * Obtém uma despesa pelo seu identificador.
 * @param id - Identificador único da despesa
 * @returns Despesa encontrada
 */
export async function obterDespesaPorId(id: number): Promise<ExpenseModel> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`);
  if (!response.ok) await tratarErroResposta(response);
  return response.json() as Promise<ExpenseModel>;
}

/**
 * Cria uma nova despesa no backend.
 * @param despesa - Dados da despesa a ser criada
 * @returns Despesa criada com o id gerado
 */
export async function criarDespesa(
  despesa: CreateExpenseModel
): Promise<ExpenseModel> {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(despesa),
  });
  if (!response.ok) await tratarErroResposta(response);
  return response.json() as Promise<ExpenseModel>;
}

/**
 * Atualiza parcialmente uma despesa existente.
 * @param id - Identificador da despesa a atualizar
 * @param dados - Campos a serem atualizados
 * @returns Despesa atualizada
 */
export async function atualizarDespesa(
  id: number,
  dados: Partial<CreateExpenseModel>
): Promise<ExpenseModel> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!response.ok) await tratarErroResposta(response);
  return response.json() as Promise<ExpenseModel>;
}

/**
 * Exclui uma despesa pelo seu identificador.
 * @param id - Identificador da despesa a excluir
 */
export async function excluirDespesa(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) await tratarErroResposta(response);
}
