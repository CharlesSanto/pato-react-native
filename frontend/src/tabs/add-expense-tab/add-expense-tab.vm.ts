import { Dispatch, SetStateAction } from "react";
import { ExpenseCategory, ExpenseModel } from "../../models/expense.model";
import { criarDespesa } from "../../services/expenses.service";

type SetState<T> = Dispatch<SetStateAction<T>>;
export class AddExpenseTabViewModel {
  /**
   * Atualiza o campo de descrição no estado do formulário.
   * @param texto - Novo valor digitado
   * @param setDescription - Setter do estado de descrição
   */
  public handleDescriptionChange = (
    texto: string,
    setDescription: SetState<string>,
  ): void => {
    setDescription(texto);
  };

  /**
   * Atualiza o campo de valor no estado do formulário.
   * Aceita apenas caracteres numéricos e separadores decimais.
   * @param texto - Novo valor digitado
   * @param setValue - Setter do estado de valor
   */
  public handleValueChange = (
    texto: string,
    setValue: SetState<string>,
  ): void => {
    // Permite apenas dígitos, vírgula e ponto
    const sanitizado = texto.replace(/[^0-9.,]/g, "");
    setValue(sanitizado);
  };

  /**
   * Atualiza o campo de data no estado do formulário.
   * @param texto - Nova data digitada
   * @param setDate - Setter do estado de data
   */
  public handleDateChange = (
    texto: string,
    setDate: SetState<string>,
  ): void => {
    setDate(texto);
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
  public validarFormulario = (
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
   * @param categoria - Categoria selecionada
   * @param observacoes - Observações opcionais
   * @param setSalvando - Setter do estado de loading
   * @param setErros - Setter da lista de erros
   * @param setSucesso - Setter do estado de sucesso
   * @param onSucesso - Callback opcional chamado após salvar com sucesso
   */
  public handleSalvarDespesaAsync = async (
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
    const erros = this.validarFormulario(description, value, date);
    if (erros.length > 0) {
      setErrors(erros);
      return;
    }

    setSaving(true);
    setErrors([]);

    try {
      const valueNum = parseFloat(value.replace(",", "."));
      const despesaCriada = await criarDespesa({
        description: description.trim(),
        value: valueNum,
        date,
        category,
        observations: observations.trim() || undefined,
      });

      setSuccess(true);
      onSuccess?.(despesaCriada);
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
