import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CATEGORY_LABELS,
  ExpenseCategory,
  ExpenseFilterModel,
} from "../../models/expense.model";
import styles from "./expense-filter.style";
import { expenseFilterViewModel } from "./expense-filter.vm";
interface ExpenseFilterProps {
  filter: ExpenseFilterModel;
  onFilterChange: (newFilter: ExpenseFilterModel) => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({
  filter,
  onFilterChange,
}) => {
  const [filtroLocal, setFiltroLocal] = useState<ExpenseFilterModel>(filter);

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange(filtroLocal);
    }, 400);
    return () => {
      clearTimeout(handler);
    };
  }, [filtroLocal, onFilterChange]);

  const setFiltroComCallback: React.Dispatch<
    React.SetStateAction<ExpenseFilterModel>
  > = (action) => {
    setFiltroLocal((prev) =>
      typeof action === "function" ? action(prev) : action,
    );
  };

  useEffect(() => {
    setFiltroComCallback(filter);
  }, [filter]);

  const todasCategorias = Object.values(ExpenseCategory);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoryOptions}>
          <TouchableOpacity
            style={[
              styles.categoryOption,
              filtroLocal.category === undefined &&
                styles.categoryOptionSelected,
            ]}
            onPress={() =>
              expenseFilterViewModel.handleCategoryChange(
                undefined,
                setFiltroLocal,
              )
            }
          >
            <Text
              style={[
                styles.categoryOptionText,
                filtroLocal.category === undefined &&
                  styles.categoryOptionSelectedText,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          {todasCategorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryOption,
                filtroLocal.category === cat && styles.categoryOptionSelected,
              ]}
              onPress={() =>
                expenseFilterViewModel.handleCategoryChange(cat, setFiltroLocal)
              }
            >
              <Text
                style={[
                  styles.categoryOptionText,
                  filtroLocal.category === cat &&
                    styles.categoryOptionSelectedText,
                ]}
              >
                {CATEGORY_LABELS[cat]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.label}>Período</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="De (AAAA-MM-DD)"
            placeholderTextColor="#95A5A6"
            value={filtroLocal.endDate ?? ""}
            onChangeText={(texto) =>
              expenseFilterViewModel.handleStartDateChange(
                texto,
                setFiltroLocal,
              )
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Até (AAAA-MM-DD)"
            placeholderTextColor="#95A5A6"
            value={filtroLocal.startDate ?? ""}
            onChangeText={(texto) =>
              expenseFilterViewModel.handleEndDateChange(texto, setFiltroLocal)
            }
          />
        </View>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.label}>Faixa de Valor (R$)</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Mínimo"
            placeholderTextColor="#95A5A6"
            keyboardType="numeric"
            value={
              filtroLocal.minValue !== undefined
                ? String(filtroLocal.minValue)
                : ""
            }
            onChangeText={(texto) =>
              expenseFilterViewModel.handleMinValueChange(texto, setFiltroLocal)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Máximo"
            placeholderTextColor="#95A5A6"
            keyboardType="numeric"
            value={
              filtroLocal.maxValue !== undefined
                ? String(filtroLocal.maxValue)
                : ""
            }
            onChangeText={(texto) =>
              expenseFilterViewModel.handleMaxValueChange(texto, setFiltroLocal)
            }
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.applyButton}
        accessibilityLabel="Aplicar filtros de despesas"
        accessibilityRole="button"
        onPress={() => onFilterChange(filtroLocal)}
      >
        <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearButton}
        accessibilityLabel="Limpar todos os filtros de despesas"
        accessibilityRole="button"
        onPress={() => {
          const filtroLimpo =
            expenseFilterViewModel.handleCleanFilters(setFiltroLocal);
          onFilterChange(filtroLimpo);
        }}
      >
        <Text style={styles.clearButtonText}>Limpar Filtros</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ExpenseFilter;
