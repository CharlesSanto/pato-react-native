import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CATEGORY_LABELS, ExpenseModel } from "../../models/expense.model";
import styles from "./expense-item.style";

interface ExpenseItemProps {
  expense: ExpenseModel;
  onPress: (expense: ExpenseModel) => void;
  onDelete: (id: number) => void;
}

/**
 * Formata um valor numérico no padrão monetário brasileiro (R$ X,XX).
 * @param value - Valor a ser formatado
 * @returns String formatada
 */
function formatarValor(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Formata uma data no formato YYYY-MM-DD para DD/MM/YYYY.
 * @param date - Data no formato ISO
 * @returns Data formatada em português
 */
function formatarData(date: string): string {
  const partes = date.split("-");
  if (partes.length === 3) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  return date;
}

/**
 * Componente que exibe os detalhes de uma despesa em um card clicável.
 */
const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(expense)}
      activeOpacity={0.85}
    >
      <View style={styles.header}>
        <Text style={styles.description} numberOfLines={2}>
          {expense.description}
        </Text>
        <Text style={styles.value}>{formatarValor(expense.value)}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.category}>{CATEGORY_LABELS[expense.category]}</Text>
        <Text style={styles.date}>{formatarData(expense.date)}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(expense.id)}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ExpenseItem;
