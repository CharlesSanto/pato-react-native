import { useEffect, useMemo, useState } from "react";
import { listExpenses } from "@services/expenses.service";
import { ExpenseCategory, ExpenseModel } from "../../models/expense.model";
import { formatCurrency } from "src/utils/CurrencyUtils";

export function useStatisticsTabVM() {
  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        setLoading(true);

        const data = await listExpenses();

        setExpenses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchExpenses();
  }, []);

  const total = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.value, 0);
  }, [expenses]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};

    for (const expense of expenses) {
      if (!expense.category) continue;

      map[expense.category] = (map[expense.category] || 0) + expense.value;
    }

    return map;
  }, [expenses]);

  const categoryChartData = useMemo(() => {
    return Object.entries(byCategory)
      .map(([key, value]) => {
        const color = getCategoryColor(key as ExpenseCategory);

        return {
          name: key,
          value,
          color: color ?? "#999999",
          legendFontColor: "#333",
          legendFontSize: 12,
        };
      })
      .filter(
        (item) =>
          typeof item.value === "number" && typeof item.color === "string",
      );
  }, [byCategory]);

  return {
    expenses,
    total,
    byCategory,
    categoryChartData,
    loading,
    error,
  };
}

function getCategoryColor(category: ExpenseCategory) {
  const colors: Record<ExpenseCategory, string> = {
    [ExpenseCategory.FOOD]: "#FF6384",
    [ExpenseCategory.TRANSPORT]: "#36A2EB",
    [ExpenseCategory.HEALTH]: "#FFCE56",
    [ExpenseCategory.EDUCATION]: "#8E44AD",
    [ExpenseCategory.LEISURE]: "#2ECC71",
    [ExpenseCategory.HOUSING]: "#E67E22",
    [ExpenseCategory.CLOTHING]: "#1ABC9C",
    [ExpenseCategory.OTHERS]: "#95A5A6",
  };

  return colors[category];
}
