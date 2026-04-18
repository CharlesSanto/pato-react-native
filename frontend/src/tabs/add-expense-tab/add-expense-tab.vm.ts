import { Dispatch, SetStateAction } from "react";
import { ExpenseCategory, ExpenseModel } from "../../models/expense.model";
import { createExpense } from "../../services/expenses.service";
import { mockExpenses } from "src/mock/ExpenseMock";

type SetState<T> = Dispatch<SetStateAction<T>>;
export class AddExpenseTabViewModel {
  /**
   * Atualiza o campo de descrição no estado do formulário.
   * @param text - Novo valor digitado
   * @param setDescription - Setter do estado de descrição
   */
  public handleDescriptionChange = (
    text: string,
    setDescription: SetState<string>,
  ): void => {
    setDescription(text);
  };

  /**
   * Atualiza o campo de valor no estado do formulário.
   * Aceita apenas caracteres numéricos e separadores decimais.
   * @param text - Novo valor digitado
   * @param setValue - Setter do estado de valor
   */
  public handleValueChange = (
    text: string,
    setValue: SetState<string>,
  ): void => {
    // Permite apenas dígitos, vírgula e ponto
    const sanitizado = text.replace(/[^0-9.,]/g, "");
    setValue(sanitizado);
  };

  /**
   * Atualiza o campo de data no estado do formulário.
   * @param text - Nova data digitada
   * @param setDate - Setter do estado de data
   */
  public handleDateChange = (text: string, setDate: SetState<string>): void => {
    setDate(text);
  };

  /**
   * Atualiza a categoria selecionada no formulário.
   * @param category - Categoria escolhida
   * @param setCategory - Setter do estado de categoria
   */
  public handleCategoryChange = (
    category: ExpenseCategory,
    setCategory: SetState<ExpenseCategory>,
  ): void => {
    setCategory(category);
  };

  /**
   * Atualiza o campo de observações no formulário.
   * @param text - Novo texto digitado
   * @param setObservations - Setter do estado de observações
   */
  public handleObservationsChange = (
    text: string,
    setObservations: SetState<string>,
  ): void => {
    setObservations(text);
  };

  /**
   * Valida os campos do formulário e retorna lista de erros.
   * @param description - Descrição da despesa
   * @param value - Valor como string
   * @param date - Data como string
   * @returns Array de mensagens de erro (vazio se válido)
   */
  public validateForm = (
    description: string,
    value: string,
    date: string,
  ): string[] => {
    const erros: string[] = [];

    if (!description.trim()) {
      erros.push("A descrição é obrigatória.");
    }

    const valueNum = parseFloat(value.replace(",", "."));
    if (!value.trim() || isNaN(valueNum) || valueNum <= 0) {
      erros.push("Informe um valor válido e maior que zero.");
    }

    if (!date.trim()) {
      erros.push("A data é obrigatória.");
    } else {
      const regexData = /^\d{4}-\d{2}-\d{2}$/;
      if (!regexData.test(date)) {
        erros.push("A data deve estar no formato AAAA-MM-DD.");
      }
    }

    return erros;
  };

  /**
   * Salva a nova despesa no backend.
   * @param description - Descrição da despesa
   * @param value - Valor como string
   * @param data - Data no formato YYYY-MM-DD
   * @param category - Categoria selecionada
   * @param observations - Observações opcionais
   * @param setSaving - Setter do estado de loading
   * @param setErrors - Setter da lista de erros
   * @param setSuccess - Setter do estado de sucesso
   * @param onSuccess - Callback opcional chamado após salvar com sucesso
   */
  public handleSaveExpenseAsync = async (
    description: string,
    value: string,
    date: string,
    category: ExpenseCategory,
    observations: string,
    setSaving: SetState<boolean>,
    setErrors: SetState<string[]>,
    setSuccess: SetState<boolean>,
    onSuccess?: (despesa: ExpenseModel) => void,
  ): Promise<void> => {
    const erros = this.validateForm(description, value, date);
    if (erros.length > 0) {
      setErrors(erros);
      return;
    }

    setSaving(true);
    setErrors([]);

    try {
      const valueNum = parseFloat(value.replace(",", "."));

      const createdExpense = await createExpense({
        description: description.trim(),
        value: valueNum,
        date,
        category,
        observations: observations.trim() || undefined,
      });

      // MOCK
      const newExpense: ExpenseModel = {
        id: mockExpenses.length
          ? Math.max(...mockExpenses.map((e) => e.id)) + 1
          : 1,
        description: description.trim(),
        value: valueNum,
        date,
        category,
        observations: observations.trim() || undefined,
      };

      mockExpenses.push(newExpense);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuccess(true);
      onSuccess?.(newExpense);
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro ao salvar despesa.";
      setErrors([mensagem]);
    } finally {
      setSaving(false);
    }
  };

  /**
   * Retorna a data atual no formato YYYY-MM-DD.
   * @returns Data atual formatada
   */
  public getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
}

/** Instância singleton do ViewModel da aba de adição */
export const addExpenseTabViewModel = new AddExpenseTabViewModel();
