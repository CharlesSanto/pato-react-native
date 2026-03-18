/**
 * @file expenses.manager.ts
 * @description Camada de negócios para gerenciamento de despesas do aplicativo Pato.
 * Implementada no paradigma funcional, cada função é pura em relação ao seu contrato de entrada/saída.
 */

import { obterConexao } from "../infra/database";
import {
  CreateExpenseModel,
  ExpenseCategory,
  ExpenseFilterModel,
  ExpenseModel,
  Result,
  UpdateExpenseModel,
} from "../models/expense.model";

/**
 * Converte uma linha bruta do banco de dados em um objeto `ExpenseModel`.
 * @param {Record<string, unknown>} linha - Linha retornada pela consulta SQLite
 * @returns {ExpenseModel} Objeto de despesa tipado
 */
const linhaParaDespesa = (linha: Record<string, unknown>): ExpenseModel => ({
  id: linha.id as number,
  descricao: linha.descricao as string,
  valor: linha.valor as number,
  data: linha.data as string,
  categoria: linha.categoria as ExpenseCategory,
  observacoes: linha.observacoes as string | undefined,
});

/**
 * Lista todas as despesas, com filtragem opcional por período, categoria e faixa de valor.
 * @param {ExpenseFilterModel} [filtro] - Critérios opcionais de filtragem
 * @returns {Promise<Result<ExpenseModel[]>>} Resultado contendo a lista de despesas ou mensagem de erro
 */
export const listarDespesasAsync = async (
  filtro?: ExpenseFilterModel
): Promise<Result<ExpenseModel[]>> => {
  try {
    const db = obterConexao();
    const condicoes: string[] = [];
    const parametros: unknown[] = [];

    if (filtro?.dataInicio) {
      condicoes.push("data >= ?");
      parametros.push(filtro.dataInicio);
    }
    if (filtro?.dataFim) {
      condicoes.push("data <= ?");
      parametros.push(filtro.dataFim);
    }
    if (filtro?.categoria) {
      condicoes.push("categoria = ?");
      parametros.push(filtro.categoria);
    }
    if (filtro?.valorMinimo !== undefined) {
      condicoes.push("valor >= ?");
      parametros.push(filtro.valorMinimo);
    }
    if (filtro?.valorMaximo !== undefined) {
      condicoes.push("valor <= ?");
      parametros.push(filtro.valorMaximo);
    }

    const clausulaWhere =
      condicoes.length > 0 ? `WHERE ${condicoes.join(" AND ")}` : "";
    const sql = `SELECT * FROM despesas ${clausulaWhere} ORDER BY data DESC`;

    const linhas = db.prepare(sql).all(...parametros) as Record<
      string,
      unknown
    >[];
    const despesas = linhas.map(linhaParaDespesa);

    return { sucesso: true, dados: despesas };
  } catch (erro) {
    return {
      sucesso: false,
      erro: `Erro ao listar despesas: ${(erro as Error).message}`,
    };
  }
};

/**
 * Busca uma única despesa pelo seu identificador.
 * @param {number} id - Identificador da despesa
 * @returns {Promise<Result<ExpenseModel>>} Resultado contendo a despesa encontrada ou mensagem de erro
 */
export const obterDespesaPorIdAsync = async (
  id: number
): Promise<Result<ExpenseModel>> => {
  try {
    const db = obterConexao();
    const linha = db
      .prepare("SELECT * FROM despesas WHERE id = ?")
      .get(id) as Record<string, unknown> | undefined;

    if (!linha) {
      return { sucesso: false, erro: `Despesa com id ${id} não encontrada.` };
    }

    return { sucesso: true, dados: linhaParaDespesa(linha) };
  } catch (erro) {
    return {
      sucesso: false,
      erro: `Erro ao obter despesa: ${(erro as Error).message}`,
    };
  }
};

/**
 * Cria uma nova despesa no banco de dados.
 * @param {CreateExpenseModel} novaDespesa - Dados da despesa a ser criada
 * @returns {Promise<Result<ExpenseModel>>} Resultado contendo a despesa criada (com id) ou mensagem de erro
 */
export const criarDespesaAsync = async (
  novaDespesa: CreateExpenseModel
): Promise<Result<ExpenseModel>> => {
  try {
    const db = obterConexao();
    const stmt = db.prepare(
      "INSERT INTO despesas (descricao, valor, data, categoria, observacoes) VALUES (?, ?, ?, ?, ?)"
    );

    const resultado = stmt.run(
      novaDespesa.descricao,
      novaDespesa.valor,
      novaDespesa.data,
      novaDespesa.categoria,
      novaDespesa.observacoes ?? null
    );

    return obterDespesaPorIdAsync(resultado.lastInsertRowid as number);
  } catch (erro) {
    return {
      sucesso: false,
      erro: `Erro ao criar despesa: ${(erro as Error).message}`,
    };
  }
};

/**
 * Atualiza campos de uma despesa existente.
 * Apenas os campos fornecidos em `dados` serão modificados.
 * @param {number} id - Identificador da despesa a ser atualizada
 * @param {UpdateExpenseModel} dados - Campos a atualizar
 * @returns {Promise<Result<ExpenseModel>>} Resultado contendo a despesa atualizada ou mensagem de erro
 */
export const atualizarDespesaAsync = async (
  id: number,
  dados: UpdateExpenseModel
): Promise<Result<ExpenseModel>> => {
  try {
    const db = obterConexao();

    const existe = db
      .prepare("SELECT id FROM despesas WHERE id = ?")
      .get(id);
    if (!existe) {
      return { sucesso: false, erro: `Despesa com id ${id} não encontrada.` };
    }

    const campos: string[] = [];
    const valores: unknown[] = [];

    if (dados.descricao !== undefined) {
      campos.push("descricao = ?");
      valores.push(dados.descricao);
    }
    if (dados.valor !== undefined) {
      campos.push("valor = ?");
      valores.push(dados.valor);
    }
    if (dados.data !== undefined) {
      campos.push("data = ?");
      valores.push(dados.data);
    }
    if (dados.categoria !== undefined) {
      campos.push("categoria = ?");
      valores.push(dados.categoria);
    }
    if (dados.observacoes !== undefined) {
      campos.push("observacoes = ?");
      valores.push(dados.observacoes);
    }

    if (campos.length === 0) {
      return obterDespesaPorIdAsync(id);
    }

    valores.push(id);
    db.prepare(`UPDATE despesas SET ${campos.join(", ")} WHERE id = ?`).run(
      ...valores
    );

    return obterDespesaPorIdAsync(id);
  } catch (erro) {
    return {
      sucesso: false,
      erro: `Erro ao atualizar despesa: ${(erro as Error).message}`,
    };
  }
};

/**
 * Remove uma despesa do banco de dados pelo seu identificador.
 * @param {number} id - Identificador da despesa a ser excluída
 * @returns {Promise<Result<boolean>>} Resultado indicando sucesso da exclusão ou mensagem de erro
 */
export const excluirDespesaAsync = async (
  id: number
): Promise<Result<boolean>> => {
  try {
    const db = obterConexao();
    const resultado = db
      .prepare("DELETE FROM despesas WHERE id = ?")
      .run(id);

    if (resultado.changes === 0) {
      return { sucesso: false, erro: `Despesa com id ${id} não encontrada.` };
    }

    return { sucesso: true, dados: true };
  } catch (erro) {
    return {
      sucesso: false,
      erro: `Erro ao excluir despesa: ${(erro as Error).message}`,
    };
  }
};
