/**
 * Estilos da aba principal (HomeTab).
 * Define a aparência da listagem e cabeçalho de despesas.
 */

import { StyleSheet } from 'react-native';

/** Estilos da aba de listagem de despesas */
const styles = StyleSheet.create({
  /** Container raiz da tela */
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  /** Cabeçalho com cor primária */
  header: {
    backgroundColor: '#2980B9',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 20,
  },
  /** Título do cabeçalho */
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  /** Card com o total de despesas */
  totalContainer: {
    backgroundColor: '#1A6FA0',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 4,
    padding: 14,
    borderRadius: 10,
  },
  /** Rótulo do total */
  totalLabel: {
    fontSize: 13,
    color: '#AED6F1',
    marginBottom: 2,
  },
  /** Valor total formatado */
  totalValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  /** Container da lista de itens */
  listContainer: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 16,
  },
  /** Container exibido quando não há despesas */
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  /** Texto de estado vazio */
  emptyText: {
    fontSize: 16,
    color: '#95A5A6',
    textAlign: 'center',
    marginTop: 8,
  },
  /** Container exibido durante carregamento */
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Botão para exibir/ocultar filtros */
  filterToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A6FA0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  /** Texto do botão de toggle de filtros */
  filterToggleButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  /** Texto de erro exibido em caso de falha */
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    textAlign: 'center',
    padding: 16,
  },
});

export default styles;
