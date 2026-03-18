/**
 * @file expenses.controller.ts
 * @description Controlador Express com as rotas REST para o recurso de despesas.
 */

import { Router, Request, Response } from "express";
import {
  listarDespesasAsync,
  obterDespesaPorIdAsync,
  criarDespesaAsync,
  atualizarDespesaAsync,
  excluirDespesaAsync,
} from "../app/expenses.manager";
import { ErrorCode, ExpenseCategory, ExpenseFilterModel } from "../models/expense.model";

/** Roteador Express para o recurso de despesas */
export const despesasRouter = Router();

/**
 * Retorna o status HTTP adequado com base no código de erro do resultado.
 * @param {ErrorCode | undefined} codigoErro - Código de erro estruturado
 * @returns {number} Código de status HTTP correspondente
 */
const httpStatusParaErro = (codigoErro: ErrorCode | undefined): number => {
  if (codigoErro === ErrorCode.NAO_ENCONTRADO) return 404;
  return 500;
};

/**
 * Converte uma string para número, retornando undefined se inválida.
 * @param {string | undefined} valor - Valor a converter
 * @returns {number | undefined} Número convertido ou undefined se inválido
 */
const parseNumeroOpcional = (valor: unknown): number | undefined => {
  if (typeof valor !== "string") return undefined;
  const n = Number(valor);
  return isNaN(n) ? undefined : n;
};

/**
 * GET /despesas
 * Lista todas as despesas, com suporte a filtros via query string.
 * Parâmetros opcionais: dataInicio, dataFim, categoria, valorMinimo, valorMaximo
 */
despesasRouter.get("/despesas", async (req: Request, res: Response) => {
  const { dataInicio, dataFim, categoria, valorMinimo, valorMaximo } =
    req.query;

  if (valorMinimo !== undefined && parseNumeroOpcional(valorMinimo) === undefined) {
    res.status(400).json({ sucesso: false, erro: "Parâmetro valorMinimo inválido." });
    return;
  }
  if (valorMaximo !== undefined && parseNumeroOpcional(valorMaximo) === undefined) {
    res.status(400).json({ sucesso: false, erro: "Parâmetro valorMaximo inválido." });
    return;
  }

  const filtro: ExpenseFilterModel = {};
  if (typeof dataInicio === "string") filtro.dataInicio = dataInicio;
  if (typeof dataFim === "string") filtro.dataFim = dataFim;
  if (typeof categoria === "string") filtro.categoria = categoria as ExpenseCategory;
  if (typeof valorMinimo === "string") filtro.valorMinimo = Number(valorMinimo);
  if (typeof valorMaximo === "string") filtro.valorMaximo = Number(valorMaximo);

  const resultado = await listarDespesasAsync(filtro);

  if (!resultado.sucesso) {
    res.status(httpStatusParaErro(resultado.codigoErro)).json(resultado);
    return;
  }

  res.status(200).json(resultado);
});

/**
 * GET /despesas/:id
 * Retorna uma despesa específica pelo seu identificador.
 */
despesasRouter.get("/despesas/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ sucesso: false, erro: "Id inválido." });
    return;
  }

  const resultado = await obterDespesaPorIdAsync(id);

  if (!resultado.sucesso) {
    res.status(httpStatusParaErro(resultado.codigoErro)).json(resultado);
    return;
  }

  res.status(200).json(resultado);
});

/**
 * POST /despesas
 * Cria uma nova despesa com os dados enviados no corpo da requisição.
 */
despesasRouter.post("/despesas", async (req: Request, res: Response) => {
  const { descricao, valor, data, categoria, observacoes } = req.body;

  if (!descricao || valor === undefined || !data || !categoria) {
    res.status(400).json({
      sucesso: false,
      erro: "Campos obrigatórios ausentes: descricao, valor, data, categoria.",
    });
    return;
  }

  const valorNumerico = Number(valor);
  if (isNaN(valorNumerico)) {
    res.status(400).json({ sucesso: false, erro: "Campo valor deve ser numérico." });
    return;
  }

  const resultado = await criarDespesaAsync({
    descricao,
    valor: valorNumerico,
    data,
    categoria,
    observacoes,
  });

  if (!resultado.sucesso) {
    res.status(httpStatusParaErro(resultado.codigoErro)).json(resultado);
    return;
  }

  res.status(201).json(resultado);
});

/**
 * PUT /despesas/:id
 * Atualiza parcialmente uma despesa existente pelo seu identificador.
 */
despesasRouter.put("/despesas/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ sucesso: false, erro: "Id inválido." });
    return;
  }

  const { descricao, valor, data, categoria, observacoes } = req.body;

  let valorNumerico: number | undefined;
  if (valor !== undefined) {
    valorNumerico = Number(valor);
    if (isNaN(valorNumerico)) {
      res.status(400).json({ sucesso: false, erro: "Campo valor deve ser numérico." });
      return;
    }
  }

  const resultado = await atualizarDespesaAsync(id, {
    descricao,
    valor: valorNumerico,
    data,
    categoria,
    observacoes,
  });

  if (!resultado.sucesso) {
    res.status(httpStatusParaErro(resultado.codigoErro)).json(resultado);
    return;
  }

  res.status(200).json(resultado);
});

/**
 * DELETE /despesas/:id
 * Remove uma despesa pelo seu identificador.
 */
despesasRouter.delete("/despesas/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ sucesso: false, erro: "Id inválido." });
    return;
  }

  const resultado = await excluirDespesaAsync(id);

  if (!resultado.sucesso) {
    res.status(httpStatusParaErro(resultado.codigoErro)).json(resultado);
    return;
  }

  res.status(200).json(resultado);
});

