import { db } from "../database";

import { expenses } from "../database/schema";

import { eq, and, gte, lte } from "drizzle-orm";

import {
  CreateExpenseModel,
  ExpenseFilterModel,
  UpdateExpenseModel,
} from "../models/expense.model";

export class ExpensesRepository {
  async findAll(filter?: ExpenseFilterModel) {
    const conditions = [];

    if (filter?.startDate) {
      conditions.push(
        gte(expenses.date, filter.startDate)
      );
    }

    if (filter?.endDate) {
      conditions.push(
        lte(expenses.date, filter.endDate)
      );
    }

    if (filter?.category) {
      conditions.push(
        eq(expenses.category, filter.category)
      );
    }

    if (filter?.minValue !== undefined) {
        conditions.push(
            gte(expenses.value, filter.minValue)
        );
    }

    if (filter?.maxValue !== undefined) {
        conditions.push(
            lte(expenses.value, filter.maxValue)
        );
    }

    return db
      .select()
      .from(expenses)
      .where(
        conditions.length > 0
          ? and(...conditions)
          : undefined
      );
  }

  async findById(id: number) {
    const result = await db
      .select()
      .from(expenses)
      .where(eq(expenses.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async create(data: CreateExpenseModel) {
    const result = await db
            .insert(expenses)
            .values(data)
            .returning();

        return result[0];
    }

  async update(
    id: number,
    data: UpdateExpenseModel
  ) {
    const result = await db
      .update(expenses)
      .set(data)
      .where(eq(expenses.id, id))
      .returning();

    return result[0] ?? null;
  }

  async delete(id: number) {
    const result = await db
      .delete(expenses)
      .where(eq(expenses.id, id))
      .returning();

    return result.length > 0;
  }
}