import express from "express";
import cors from "cors";

import { expensesRouter } from "./api/expenses.controller";

const app = express();

const PORT = process.env.PORT
  ? Number(process.env.PORT)
  : 3000;

app.use(cors());

app.use(express.json());

app.use("/api/expenses", expensesRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Servidor Pato rodando na porta ${PORT}`
  );
});

export default app;