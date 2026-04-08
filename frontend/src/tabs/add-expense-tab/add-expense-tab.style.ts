/**
 * Estilos da aba de adição de despesa (AddExpenseTab).
 * Define a aparência do formulário de criação de despesas.
 */

import { StyleSheet } from 'react-native';

/** Estilos da aba de adicionar despesa */
const styles = StyleSheet.create({
  /** Container raiz com scroll */
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  /** Título da tela */
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    marginTop: 8,
  },
  /** Grupo de campo do formulário */
  formGroup: {
    marginBottom: 16,
  },
  /** Rótulo de campo */
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 6,
  },
  /** Campo de entrada padrão */
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#2C3E50',
  },
  /** Campo de entrada com erro de validação */
  inputError: {
    borderColor: '#E74C3C',
  },
  /** Área de texto multilinha */
  textArea: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#2C3E50',
    minHeight: 90,
    textAlignVertical: 'top',
  },
  /** Texto de mensagem de erro de validação */
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 4,
  },
  /** Container de opções de categoria */
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  /** Botão de opção de categoria */
  categoryOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
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
  /** Botão principal de envio do formulário */
  submitButton: {
    backgroundColor: '#2980B9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  /** Estado desabilitado do botão de envio */
  submitButtonDisabled: {
    backgroundColor: '#AED6F1',
  },
  /** Texto do botão de envio */
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  /** Card de mensagem de sucesso */
  successMessage: {
    backgroundColor: '#D5F5E3',
    borderColor: '#27AE60',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  /** Texto da mensagem de sucesso */
  successMessageText: {
    color: '#1E8449',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;
