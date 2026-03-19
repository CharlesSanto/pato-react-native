/**
 * Componente ExpenseFilter.
 * Painel de filtros para refinamento da lista de despesas.
 */

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CATEGORY_LABELS,
  ExpenseCategory,
  ExpenseFilterModel,
} from '../../models/expense.model';
import styles from './expense-filter.style';
import { expenseFilterViewModel } from './expense-filter.vm';

/** Props do componente ExpenseFilter */
interface ExpenseFilterProps {
  /** Estado atual dos filtros */
  filtro: ExpenseFilterModel;
  /** Callback chamado quando algum filtro é alterado */
  onFiltroChange: (novoFiltro: ExpenseFilterModel) => void;
}

/**
 * Componente que exibe os controles de filtro de despesas.
 * Permite filtrar por categoria, período e faixa de valores.
 */
const ExpenseFilter: React.FC<ExpenseFilterProps> = ({
  filtro,
  onFiltroChange,
}) => {
  const [filtroLocal, setFiltroLocal] = useState<ExpenseFilterModel>(filtro);

  /** Sincroniza o estado local caso o filtro externo seja atualizado */
  useEffect(() => {
    setFiltroLocal(filtro);
  }, [filtro]);

  const todasCategorias = Object.values(ExpenseCategory);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Filtro por categoria */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoryOptions}>
          {/* Opção "Todas" */}
          <TouchableOpacity
            style={[
              styles.categoryOption,
              filtroLocal.categoria === undefined &&
                styles.categoryOptionSelected,
            ]}
            onPress={() =>
                expenseFilterViewModel.handleCategoriaChange(
                  undefined,
                  setFiltroLocal
                )
              }
            >
            <Text
              style={[
                styles.categoryOptionText,
                filtroLocal.categoria === undefined &&
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
                filtroLocal.categoria === cat && styles.categoryOptionSelected,
              ]}
              onPress={() =>
                expenseFilterViewModel.handleCategoriaChange(
                  cat,
                  setFiltroLocal
                )
              }
            >
              <Text
                style={[
                  styles.categoryOptionText,
                  filtroLocal.categoria === cat &&
                    styles.categoryOptionSelectedText,
                ]}
              >
                {CATEGORY_LABELS[cat]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Filtro por período */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Período</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="De (AAAA-MM-DD)"
            placeholderTextColor="#95A5A6"
            value={filtroLocal.dataInicio ?? ''}
            onChangeText={(texto) =>
              expenseFilterViewModel.handleDataInicioChange(
                texto,
                setFiltroLocal
              )
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Até (AAAA-MM-DD)"
            placeholderTextColor="#95A5A6"
            value={filtroLocal.dataFim ?? ''}
            onChangeText={(texto) =>
              expenseFilterViewModel.handleDataFimChange(
                texto,
                setFiltroLocal
              )
            }
          />
        </View>
      </View>

      {/* Filtro por faixa de valores */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Faixa de Valor (R$)</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Mínimo"
            placeholderTextColor="#95A5A6"
            keyboardType="numeric"
            value={
              filtroLocal.valorMinimo !== undefined
                ? String(filtroLocal.valorMinimo)
                : ''
            }
            onChangeText={(texto) =>
              expenseFilterViewModel.handleValorMinimoChange(
                texto,
                setFiltroLocal
              )
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Máximo"
            placeholderTextColor="#95A5A6"
            keyboardType="numeric"
            value={
              filtroLocal.valorMaximo !== undefined
                ? String(filtroLocal.valorMaximo)
                : ''
            }
            onChangeText={(texto) =>
              expenseFilterViewModel.handleValorMaximoChange(
                texto,
                setFiltroLocal
              )
            }
          />
        </View>
      </View>

      {/* Botão aplicar filtros */}
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => onFiltroChange(filtroLocal)}
      >
        <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
      </TouchableOpacity>

      {/* Botão limpar filtros */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => {
          expenseFilterViewModel.handleLimparFiltros(setFiltroLocal);
          onFiltroChange({});
        }}
      >
        <Text style={styles.clearButtonText}>Limpar Filtros</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ExpenseFilter;
