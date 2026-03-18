/**
 * Aba principal do aplicativo Pato.
 * Exibe a listagem de despesas com suporte a filtros e exclusão.
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ExpenseFilter from '../../components/expense-filter/expense-filter';
import ExpenseItem from '../../components/expense-item/expense-item';
import {
  ExpenseFilterModel,
  ExpenseModel,
} from '../../models/expense.model';
import styles from './home-tab.style';
import { homeTabViewModel } from './home-tab.vm';

/**
 * Componente da aba inicial que lista e gerencia as despesas do usuário.
 */
const HomeTab: React.FC = () => {
  const [despesas, setDespesas] = useState<ExpenseModel[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<ExpenseFilterModel>({});
  const [filtrosVisiveis, setFiltrosVisiveis] = useState(false);

  /** Carrega as despesas ao montar o componente */
  useEffect(() => {
    homeTabViewModel.handleCarregarDespesasAsync(
      setDespesas,
      setCarregando,
      setErro,
      filtro
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Callback de exclusão de despesa */
  const handleExcluir = useCallback(
    (id: number) => {
      homeTabViewModel.handleExcluirDespesaAsync(
        id,
        setDespesas,
        setCarregando,
        setErro,
        filtro
      );
    },
    [filtro]
  );

  /** Callback de press em item (placeholder para navegação futura) */
  const handlePressItem = useCallback((_expense: ExpenseModel) => {
    // Reservado para navegação de detalhes
  }, []);

  /** Callback de alteração de filtros */
  const handleFiltroChange = useCallback(
    (novoFiltro: ExpenseFilterModel) => {
      homeTabViewModel.handleAplicarFiltrosAsync(
        novoFiltro,
        setFiltro,
        setDespesas,
        setCarregando,
        setErro
      );
    },
    []
  );

  const total = homeTabViewModel.calcularTotalDespesas(despesas);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Despesas</Text>
        <TouchableOpacity
          style={styles.filterToggleButton}
          onPress={() =>
            homeTabViewModel.handleToggleFiltros(setFiltrosVisiveis)
          }
        >
          <Text style={styles.filterToggleButtonText}>
            {filtrosVisiveis ? '▲ Ocultar Filtros' : '▼ Filtros'}
          </Text>
        </TouchableOpacity>

        {/* Card de total */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total do período</Text>
          <Text style={styles.totalValue}>
            {homeTabViewModel.formatarValorMonetario(total)}
          </Text>
        </View>
      </View>

      {/* Painel de filtros (colapsável) */}
      {filtrosVisiveis && (
        <ExpenseFilter filtro={filtro} onFiltroChange={handleFiltroChange} />
      )}

      {/* Mensagem de erro */}
      {erro !== null && <Text style={styles.errorText}>{erro}</Text>}

      {/* Estado de carregamento */}
      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2980B9" />
        </View>
      ) : (
        <FlatList
          style={styles.listContainer}
          data={despesas}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ExpenseItem
              expense={item}
              onPress={handlePressItem}
              onDelete={handleExcluir}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhuma despesa encontrada.{'\n'}Adicione sua primeira despesa!
              </Text>
            </View>
          }
          contentContainerStyle={
            despesas.length === 0 ? { flex: 1 } : undefined
          }
        />
      )}
    </View>
  );
};

export default HomeTab;
