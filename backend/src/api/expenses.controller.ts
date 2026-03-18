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
import { ExpenseCategory, ExpenseFilterModel } from "../models/expense.model";

/** Roteador Express para o recurso de despesas */
export const despesasRouter = Router();

/**
 * GET /despesas
 * Lista todas as despesas, com suporte a filtros via query string.
 * Parâmetros opcionais: dataInicio, dataFim, categoria, valorMinimo, valorMaximo
 */
despesasRouter.get("/despesas", async (req: Request, res: Response) => {
  const { dataInicio, dataFim, categoria, valorMinimo, valorMaximo } =
    req.query;

  const filtro: ExpenseFilterModel = {};

  if (typeof dataInicio === "string") filtro.dataInicio = dataInicio;
  if (typeof dataFim === "string") filtro.dataFim = dataFim;
  if (typeof categoria === "string")
    filtro.categoria = categoria as ExpenseCategory;
  if (typeof valorMinimo === "string") filtro.valorMinimo = Number(valorMinimo);
  if (typeof valorMaximo === "string") filtro.valorMaximo = Number(valorMaximo);

  const resultado = await listarDespesasAsync(filtro);

  if (!resultado.sucesso) {
    res.status(500).json(resultado);
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
    res.status(404).json(resultado);
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

  const resultado = await criarDespesaAsync({
    descricao,
    valor: Number(valor),
    data,
    categoria,
    observacoes,
  });

  if (!resultado.sucesso) {
    res.status(500).json(resultado);
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

  const resultado = await atualizarDespesaAsync(id, {
    descricao,
    valor: valor !== undefined ? Number(valor) : undefined,
    data,
    categoria,
    observacoes,
  });

  if (!resultado.sucesso) {
    const status = resultado.erro?.includes("não encontrada") ? 404 : 500;
    res.status(status).json(resultado);
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
    const status = resultado.erro?.includes("não encontrada") ? 404 : 500;
    res.status(status).json(resultado);
    return;
  }

  res.status(200).json(resultado);
});
