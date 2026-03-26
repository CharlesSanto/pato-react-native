/**
 * @file server.ts
 * @description Ponto de entrada do servidor Express para a API do aplicativo Pato.
 * Inicializa o banco de dados, configura middlewares e registra as rotas.
 */

import express from "express";
import cors from "cors";
import { inicializarBancoDados } from "./infra/database";
import { despesasRouter } from "./api/expenses.controller";

/** Instância principal do aplicativo Express */
const app = express();

/** Porta em que o servidor irá escutar (padrão: 3000) */
const PORTA = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());

/** Registra todas as rotas de despesas sob o prefixo /api */
app.use("/api", despesasRouter);

/**
 * Inicializa o banco de dados e inicia o servidor HTTP.
 */
inicializarBancoDados();

app.listen(PORTA, "0.0.0.0", () => {
  console.log(`Servidor Pato rodando na porta ${PORTA}`);
});

export default app;
