import { Router, Request, Response } from "express";

import {
  ExpensesService
} from "../app/expenses.manager";

import {
  ErrorCode,
  ExpenseCategory,
  ExpenseFilterModel,
} from "../models/expense.model";

export const expensesRouter = Router();

const service = new ExpensesService()

const getHttpStatusByError = (
  errorCode?: ErrorCode
): number => {
  if (errorCode === ErrorCode.NOT_FOUND) {
    return 404;
  }

  return 500;
};

const parseOptionalNumber = (
  value: unknown
): number | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const parsed = Number(value);

  return isNaN(parsed)
    ? undefined
    : parsed;
};

const isValidCategory = (
  category: unknown
): category is ExpenseCategory => {
  return (
    typeof category === "string" &&
    Object.values(ExpenseCategory).includes(
      category as ExpenseCategory
    )
  );
};

expensesRouter.get(
  "/",
  async (req: Request, res: Response) => {
    const {
      startDate,
      endDate,
      category,
      minValue,
      maxValue,
    } = req.query;

    const filter: ExpenseFilterModel = {};

    if (typeof startDate === "string") {
      filter.startDate = startDate;
    }

    if (typeof endDate === "string") {
      filter.endDate = endDate;
    }

    if (typeof category === "string") {
      filter.category =
        category as ExpenseCategory;
    }

    if (typeof minValue === "string") {
      filter.minValue = Number(minValue);
    }

    if (typeof maxValue === "string") {
      filter.maxValue = Number(maxValue);
    }

    const result =
      await service.listExpensesAsync(filter);

    if (!result.success) {
      res
        .status(
          getHttpStatusByError(
            result.errorCode
          )
        )
        .json(result);

      return;
    }

    res.status(200).json(result);
  }
);

expensesRouter.get(
  "/:id",
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        error: "Invalid id.",
      });

      return;
    }

    const result =
      await service.getExpenseByIdAsync(id);

    if (!result.success) {
      res
        .status(
          getHttpStatusByError(
            result.errorCode
          )
        )
        .json(result);

      return;
    }

    res.status(200).json(result);
  }
);

expensesRouter.post(
  "/",
  async (req: Request, res: Response) => {
    const {
      description,
      value,
      date,
      category,
      observations,
    } = req.body;

    if (
      !description ||
      value === undefined ||
      !date ||
      !category
    ) {
      res.status(400).json({
        success: false,
        error:
          "Missing required fields: description, value, date, category.",
      });

      return;
    }

    const numericValue = Number(value);

    if (isNaN(numericValue)) {
      res.status(400).json({
        success: false,
        error:
          "Value field must be numeric.",
      });

      return;
    }

    if (!isValidCategory(category)) {
      res.status(400).json({
        success: false,
        error: "Invalid category.",
      });

      return;
    }

    const result =
      await service.createExpenseAsync({
        description,
        value: numericValue,
        date,
        category,
      });

    if (!result.success) {
      res
        .status(
          400
        )
        .json(result);

      return;
    }

    res.status(201).json(result);
  }
);

expensesRouter.put(
  "/:id",
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        error: "Invalid id.",
      });

      return;
    }

    const {
      description,
      value,
      date,
      category,
      observations,
    } = req.body;

    let numericValue:
      | number
      | undefined;

    if (value !== undefined) {
      numericValue = Number(value);

      if (isNaN(numericValue)) {
        res.status(400).json({
          success: false,
          error:
            "Value field must be numeric.",
        });

        return;
      }
    }

    if (
      category !== undefined &&
      !isValidCategory(category)
    ) {
      res.status(400).json({
        success: false,
        error: "Invalid category.",
      });

      return;
    }

    const result =
      await service.updateExpenseAsync(id, {
        description,
        value: numericValue,
        date,
        category,
      });

    if (!result.success) {
      res
        .status(
          getHttpStatusByError(
            result.errorCode
          )
        )
        .json(result);

      return;
    }

    res.status(200).json(result);
  }
);

expensesRouter.delete(
  "/:id",
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        error: "Invalid id.",
      });

      return;
    }

    const result =
      await service.deleteExpenseAsync(id);

    if (!result.success) {
      res
        .status(
          getHttpStatusByError(
            result.errorCode
          )
        )
        .json(result);

      return;
    }

    res.status(200).json(result);
  }
);