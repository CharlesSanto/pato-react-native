import { ExpensesRepository } from "../repository/expenses.repository";

import {
  CreateExpenseModel,
  ErrorCode,
  ExpenseFilterModel,
  Result,
  UpdateExpenseModel,
} from "../models/expense.model";

const repository = new ExpensesRepository();

export class ExpensesService {
  async listExpensesAsync(
    filtro?: ExpenseFilterModel
  ): Promise<Result<any[]>> {
    try {
      const despesas =
        await repository.findAll(filtro);

      return {
        success: true,
        data: despesas,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  async getExpenseByIdAsync(id: number) {
    try {
      const despesa =
        await repository.findById(id);

      if (!despesa) {
        return {
          success: false,
          error: "Despesa não encontrada",
          errorCode: ErrorCode.NOT_FOUND,
        };
      }

      return {
        success: true,
        data: despesa,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  async createExpenseAsync(data: CreateExpenseModel) {
    try {
      const expense = await repository.create(data);
  
      return {
        success: true,
        data: expense,
      };
    } catch (error: any) {
      console.error(error);
      console.error(error.cause);
  
      return {
        success: false,
        error: error.cause?.message || error.message,
      };
    }
  }

  async updateExpenseAsync(
    id: number,
    data: UpdateExpenseModel
  ) {
    try {
      const despesa =
        await repository.update(id, data);

      if (!despesa) {
        return {
          success: false,
          error: "Despesa não encontrada",
          errorCode: ErrorCode.NOT_FOUND,
        };
      }

      return {
        success: true,
        data: despesa,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  async deleteExpenseAsync(id: number) {
    try {
      const deleted =
        await repository.delete(id);

      if (!deleted) {
        return {
          success: false,
          error: "Despesa não encontrada",
          errorCode: ErrorCode.NOT_FOUND,
        };
      }

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }
}