/**
 * Estilos do componente ExpenseItem.
 * Define a aparência visual de cada item na lista de despesas.
 */

import { StyleSheet } from 'react-native';

/** Estilos do componente de item de despesa */
const styles = StyleSheet.create({
  /** Container principal do card de despesa */
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  /** Linha superior com descrição e valor */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  /** Texto de descrição da despesa */
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 8,
  },
  /** Valor monetário da despesa em destaque verde */
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  /** Linha inferior com categoria e data */
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  /** Estilo de badge para a categoria */
  categoria: {
    backgroundColor: '#EBF5FB',
    color: '#2980B9',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  /** Texto de data formatada */
  data: {
    fontSize: 12,
    color: '#95A5A6',
  },
  /** Botão de exclusão em vermelho */
  deleteButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  /** Texto do botão de exclusão */
  deleteButtonText: {
    color: '#E74C3C',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default styles;
