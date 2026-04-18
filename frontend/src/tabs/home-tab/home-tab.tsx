import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ExpenseFilter from "../../components/expense-filter/expense-filter";
import ExpenseItem from "../../components/expense-item/expense-item";
import { ExpenseFilterModel, ExpenseModel } from "../../models/expense.model";
import styles from "./home-tab.style";
import { homeTabViewModel } from "./home-tab.vm";

const HomeTab: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ExpenseFilterModel>({});
  const [visibleFilters, setVisibleFilters] = useState(false);

  useEffect(() => {
    homeTabViewModel.handleLoadExpensesAsync(
      setExpenses,
      setLoading,
      setError,
      filter,
    );
  }, []);

  const handleDelete = useCallback(
    (id: number) => {
      homeTabViewModel.handleDeleteExpenseAsync(
        id,
        setExpenses,
        setLoading,
        setError,
        filter,
      );
    },
    [filter],
  );

  const handlePressItem = useCallback((_expense: ExpenseModel) => {
    // Reservado para navegação de detalhes
  }, []);

  const handleFilterChange = useCallback((newFilter: ExpenseFilterModel) => {
    homeTabViewModel.handleApplyFiltersAsync(
      newFilter,
      setFilter,
      setExpenses,
      setLoading,
      setError,
    );
  }, []);

  const total = homeTabViewModel.sumExpenses(expenses);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Despesas</Text>
        <TouchableOpacity
          style={styles.filterToggleButton}
          onPress={() =>
            homeTabViewModel.handleToggleFilters(setVisibleFilters)
          }
        >
          <Text style={styles.filterToggleButtonText}>
            {visibleFilters ? "▲ Ocultar Filtros" : "▼ Filtros"}
          </Text>
        </TouchableOpacity>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total do período</Text>
          <Text style={styles.totalValue}>
            {homeTabViewModel.formatCurrency(total)}
          </Text>
        </View>
      </View>

      {visibleFilters && (
        <ExpenseFilter filter={filter} onFilterChange={handleFilterChange} />
      )}

      {error !== null && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2980B9" />
        </View>
      ) : (
        <FlatList
          style={styles.listContainer}
          data={expenses}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ExpenseItem
              expense={item}
              onPress={handlePressItem}
              onDelete={handleDelete}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhuma despesa encontrada.{"\n"}Adicione sua primeira despesa!
              </Text>
            </View>
          }
          contentContainerStyle={
            expenses.length === 0 ? { flex: 1 } : undefined
          }
        />
      )}
    </View>
  );
};

export default HomeTab;
