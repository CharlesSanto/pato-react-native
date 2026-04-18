import { Dispatch, SetStateAction } from "react";
import {
  ExpenseCategory,
  ExpenseFilterModel,
} from "../../models/expense.model";

type SetFilterFn = Dispatch<SetStateAction<ExpenseFilterModel>>;

export class ExpenseFilterViewModel {
  /**
   * Atualiza a categoria selecionada no filtro.
   * @param category - Nova categoria ou undefined para "Todas"
   * @param setFilter - Setter do estado de filtro
   */
  public handleCategoryChange = (
    category: ExpenseCategory | undefined,
    setFilter: SetFilterFn,
  ): void => {
    setFilter((prev) => ({ ...prev, category }));
  };

  /**
   * Atualiza a data de início no filtro.
   * @param date - Data de início no formato YYYY-MM-DD
   * @param setFilter - Setter do estado de filtro
   */
  public handleStartDateChange = (
    date: string,
    setFilter: SetFilterFn,
  ): void => {
    setFilter((prev) => ({ ...prev, dataInicio: date || undefined }));
  };

  /**
   * Atualiza a data de fim no filtro.
   * @param date - Data de fim no formato YYYY-MM-DD
   * @param setFilter - Setter do estado de filtro
   */
  public handleEndDateChange = (date: string, setFilter: SetFilterFn): void => {
    setFilter((prev) => ({ ...prev, dataFim: date || undefined }));
  };

  /**
   * Atualiza o valor mínimo no filtro.
   * @param value - Valor mínimo como string (entrada do usuário)
   * @param setFilter - Setter do estado de filtro
   */
  public handleMinValueChange = (
    value: string,
    setFilter: SetFilterFn,
  ): void => {
    const num = parseFloat(value.replace(",", "."));
    setFilter((prev) => ({
      ...prev,
      valorMinimo: value === "" ? undefined : isNaN(num) ? undefined : num,
    }));
  };

  /**
   * Atualiza o valor máximo no filtro.
   * @param valor - Valor máximo como string (entrada do usuário)
   * @param setFilter - Setter do estado de filtro
   */
  public handleMaxValueChange = (
    valor: string,
    setFilter: SetFilterFn,
  ): void => {
    const num = parseFloat(valor.replace(",", "."));
    setFilter((prev) => ({
      ...prev,
      maxValue: valor === "" ? undefined : isNaN(num) ? undefined : num,
    }));
  };

  /**
   * Limpa todos os filtros aplicados, retornando ao estado inicial.
   * @param setFilter - Setter do estado de filtro
   * @returns Filtro limpo aplicado
   */
  public handleCleanFilters = (setFilter: SetFilterFn): ExpenseFilterModel => {
    const cleanFilter: ExpenseFilterModel = {};
    setFilter(cleanFilter);
    return cleanFilter;
  };
}

/** Instância singleton do ViewModel de filtro de despesas */
export const expenseFilterViewModel = new ExpenseFilterViewModel();
