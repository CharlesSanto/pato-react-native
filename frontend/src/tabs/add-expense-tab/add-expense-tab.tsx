/**
 * Aba de adição de despesas do aplicativo Pato.
 * Formulário completo para registro de uma nova despesa.
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CATEGORY_LABELS,
  ExpenseCategory,
} from '../../models/expense.model';
import styles from './add-expense-tab.style';
import { addExpenseTabViewModel } from './add-expense-tab.vm';

/**
 * Componente da aba de adição de despesas.
 * Permite ao usuário preencher e submeter uma nova despesa.
 */
const AddExpenseTab: React.FC = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(addExpenseTabViewModel.obterDataAtual());
  const [categoria, setCategoria] = useState<ExpenseCategory>(
    ExpenseCategory.OUTROS
  );
  const [observacoes, setObservacoes] = useState('');
  const [erros, setErros] = useState<string[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const todasCategorias = Object.values(ExpenseCategory);

  /** Reseta o formulário para o estado inicial após salvar */
  const resetarFormulario = (): void => {
    setDescricao('');
    setValor('');
    setData(addExpenseTabViewModel.obterDataAtual());
    setCategoria(ExpenseCategory.OUTROS);
    setObservacoes('');
    setErros([]);
    setTimeout(() => setSucesso(false), 3000);
  };

  /** Submete o formulário */
  const handleSubmit = (): void => {
    addExpenseTabViewModel.handleSalvarDespesaAsync(
      descricao,
      valor,
      data,
      categoria,
      observacoes,
      setSalvando,
      setErros,
      setSucesso,
      () => resetarFormulario()
    );
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.titulo}>Adicionar Despesa</Text>

      {/* Mensagem de sucesso */}
      {sucesso && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>
            ✓ Despesa adicionada com sucesso!
          </Text>
        </View>
      )}

      {/* Erros de validação */}
      {erros.map((erro, index) => (
        <Text key={index} style={styles.errorText}>
          • {erro}
        </Text>
      ))}

      {/* Campo: Descrição */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, erros.length > 0 && !descricao && styles.inputError]}
          placeholder="Ex.: Almoço no restaurante"
          placeholderTextColor="#95A5A6"
          value={descricao}
          onChangeText={(texto) =>
            addExpenseTabViewModel.handleDescricaoChange(texto, setDescricao)
          }
          maxLength={100}
        />
      </View>

      {/* Campo: Valor */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Valor (R$) *</Text>
        <TextInput
          style={[styles.input, erros.length > 0 && !valor && styles.inputError]}
          placeholder="0,00"
          placeholderTextColor="#95A5A6"
          keyboardType="decimal-pad"
          value={valor}
          onChangeText={(texto) =>
            addExpenseTabViewModel.handleValorChange(texto, setValor)
          }
        />
      </View>

      {/* Campo: Data */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Data *</Text>
        <TextInput
          style={styles.input}
          placeholder="AAAA-MM-DD"
          placeholderTextColor="#95A5A6"
          value={data}
          onChangeText={(texto) =>
            addExpenseTabViewModel.handleDataChange(texto, setData)
          }
          maxLength={10}
        />
      </View>

      {/* Campo: Categoria */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoria *</Text>
        <View style={styles.categoryContainer}>
          {todasCategorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryOption,
                categoria === cat && styles.categoryOptionSelected,
              ]}
              onPress={() =>
                addExpenseTabViewModel.handleCategoriaChange(cat, setCategoria)
              }
            >
              <Text
                style={[
                  styles.categoryOptionText,
                  categoria === cat && styles.categoryOptionSelectedText,
                ]}
              >
                {CATEGORY_LABELS[cat]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Campo: Observações */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Observações (opcional)</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Informações adicionais sobre a despesa..."
          placeholderTextColor="#95A5A6"
          multiline
          numberOfLines={3}
          value={observacoes}
          onChangeText={(texto) =>
            addExpenseTabViewModel.handleObservacoesChange(texto, setObservacoes)
          }
        />
      </View>

      {/* Botão de submissão */}
      <TouchableOpacity
        style={[styles.submitButton, salvando && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={salvando}
      >
        {salvando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Adicionar Despesa</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExpenseTab;
