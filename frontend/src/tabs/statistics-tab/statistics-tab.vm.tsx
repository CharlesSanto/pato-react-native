import { useMemo } from "react";
import { mockExpenses } from "src/mock/ExpenseMock";
import { ExpenseCategory } from "../../models/expense.model";

export function useStatisticsTabVM() {
const expenses = [...mockExpenses]

  const total = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.value, 0);
  }, [expenses]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};

    for (const expense of expenses) {
        if(!expense.category) continue

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
                value: value,
                color: color ?? "#999999",
                legendFontColor: "#333",
                legendFontSize: 12,
            };
        })
        .filter(item =>
            item &&
            typeof item.value === "number" &&
            typeof item.color === "string"
        );
    }, [byCategory]);

  return {
    total,
    byCategory,
    categoryChartData,
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