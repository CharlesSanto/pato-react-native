/**
 * Estilos do componente ExpenseFilter.
 * Define a aparência do painel de filtros de despesas.
 */

import { StyleSheet } from 'react-native';

/** Estilos do componente de filtro de despesas */
const styles = StyleSheet.create({
  /** Container principal do painel de filtros */
  container: {
    backgroundColor: '#F2F3F4',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D5D8DC',
  },
  /** Linha com dois elementos lado a lado */
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  /** Rótulo de campo de filtro */
  label: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#2C3E50',
    marginBottom: 4,
  },
  /** Campo de entrada de texto */
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#2C3E50',
    flex: 1,
  },
  /** Grupo de filtro com espaçamento inferior */
  filterGroup: {
    marginBottom: 12,
  },
  /** Picker de categoria */
  picker: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  /** Botão para limpar todos os filtros */
  clearButton: {
    backgroundColor: '#E74C3C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  /** Botão para aplicar filtros */
  applyButton: {
    backgroundColor: '#2980B9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  /** Texto do botão de aplicar filtros */
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  /** Texto do botão de limpar filtros */
  clearButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  /** Container de opções de categoria */
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  /** Botão de opção de categoria */
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2980B9',
    backgroundColor: '#FFFFFF',
  },
  /** Texto da opção de categoria */
  categoryOptionText: {
    color: '#2980B9',
    fontSize: 13,
  },
  /** Opção de categoria selecionada */
  categoryOptionSelected: {
    backgroundColor: '#2980B9',
  },
  /** Texto da opção selecionada */
  categoryOptionSelectedText: {
    color: '#FFFFFF',
  },
});

export default styles;
