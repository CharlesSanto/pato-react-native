/**
 * Componente ExpenseItem.
 * Renderiza um único item de despesa em formato de card na lista.
 */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CATEGORY_LABELS, ExpenseModel } from '../../models/expense.model';
import styles from './expense-item.style';

/** Props do componente ExpenseItem */
interface ExpenseItemProps {
  /** Despesa a ser exibida */
  expense: ExpenseModel;
  /** Callback disparado ao pressionar o item */
  onPress: (expense: ExpenseModel) => void;
  /** Callback disparado ao solicitar exclusão do item */
  onDelete: (id: number) => void;
}

/**
 * Formata um valor numérico no padrão monetário brasileiro (R$ X,XX).
 * @param valor - Valor a ser formatado
 * @returns String formatada
 */
function formatarValor(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/**
 * Formata uma data no formato YYYY-MM-DD para DD/MM/YYYY.
 * @param data - Data no formato ISO
 * @returns Data formatada em português
 */
function formatarData(data: string): string {
  const partes = data.split('-');
  if (partes.length === 3) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  return data;
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
        <Text style={styles.descricao} numberOfLines={2}>
          {expense.descricao}
        </Text>
        <Text style={styles.valor}>{formatarValor(expense.valor)}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.categoria}>
          {CATEGORY_LABELS[expense.categoria]}
        </Text>
        <Text style={styles.data}>{formatarData(expense.data)}</Text>
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
