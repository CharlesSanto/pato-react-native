import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CATEGORY_LABELS, ExpenseCategory } from "../../models/expense.model";
import styles from "./add-expense-tab.style";
import { addExpenseTabViewModel } from "./add-expense-tab.vm";
import { Toast } from "toastify-react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { formatCurrency } from "src/utils/CurrencyUtils";

const AddExpenseTab: React.FC = () => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState<DateType>(addExpenseTabViewModel.getCurrentDate());
  const [category, setCategory] = useState<ExpenseCategory>(
    ExpenseCategory.OTHERS,
  );
  const [observations, setObservations] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const successTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  React.useEffect(() => {
    return () => {
      if (successTimerRef.current !== null) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const todasCategorias = Object.values(ExpenseCategory);

  const resetForm = (): void => {
    setDescription("");
    setValue("");
    setDate(addExpenseTabViewModel.getCurrentDate());
    setCategory(ExpenseCategory.OTHERS);
    setObservations("");
    setErrors([]);
    if (successTimerRef.current !== null) {
      clearTimeout(successTimerRef.current);
    }
    successTimerRef.current = setTimeout(() => setSuccess(false), 3000);
  };

  const handleSubmit = (): void => {
    addExpenseTabViewModel.handleSaveExpenseAsync(
      description,
      value,
      date,
      category,
      observations,
      setSaving,
      setErrors,
      setSuccess,
      () => resetForm(),
    );
  };

  useEffect(() => {
    if (success) {
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Despesa adicionada com sucesso!",
      });

      resetForm();
    }
  }, [success]);

  useEffect(() => {
    if (success) {
      Toast.show({
        type: "success",
        text1: "Erro",
        text2: errors.join(', '),
      });

      resetForm();
    }
  }, [errors]);

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.titulo}>Adicionar Despesa</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[
            styles.input,
            errors.length > 0 && !description.trim() && styles.inputError,
          ]}
          placeholder="Ex.: Almoço no restaurante"
          placeholderTextColor="#95A5A6"
          value={description}
          onChangeText={(texto) =>
            addExpenseTabViewModel.handleDescriptionChange(
              texto,
              setDescription,
            )
          }
          maxLength={100}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Valor (R$) *</Text>
        <TextInput
          style={[
            styles.input,
            errors.length > 0 && !value && styles.inputError,
          ]}
          placeholder="0,00"
          placeholderTextColor="#95A5A6"
          keyboardType="numeric"
          value={value}
          onChangeText={(texto) => {
            const formatted = formatCurrency(texto);
            setValue(formatted);
          }}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Data *</Text>
        <DateTimePicker 
          mode="single"
          date={date}
          onChange={(date) => addExpenseTabViewModel.handleDateChange(date.date, setDate)}
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoria *</Text>
        <View style={styles.categoryContainer}>
          {todasCategorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryOption,
                category === cat && styles.categoryOptionSelected,
              ]}
              onPress={() =>
                addExpenseTabViewModel.handleCategoryChange(cat, setCategory)
              }
            >
              <Text
                style={[
                  styles.categoryOptionText,
                  category === cat && styles.categoryOptionSelectedText,
                ]}
              >
                {CATEGORY_LABELS[cat]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Observações (opcional)</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Informações adicionais sobre a despesa..."
          placeholderTextColor="#95A5A6"
          multiline
          numberOfLines={3}
          value={observations}
          onChangeText={(texto) =>
            addExpenseTabViewModel.handleObservationsChange(
              texto,
              setObservations,
            )
          }
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, saving && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Adicionar Despesa</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExpenseTab;
