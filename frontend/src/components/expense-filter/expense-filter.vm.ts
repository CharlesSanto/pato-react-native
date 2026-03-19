/**
 * ViewModel do componente ExpenseFilter.
 * Contém a lógica de manipulação dos filtros de despesas.
 */

import { Dispatch, SetStateAction } from 'react';
import { ExpenseCategory, ExpenseFilterModel } from '../../models/expense.model';

/** Tipo do setter do estado de filtro */
type SetFiltroFn = Dispatch<SetStateAction<ExpenseFilterModel>>;

/**
 * ViewModel responsável por gerenciar as interações do componente de filtro.
 */
export class ExpenseFilterViewModel {
  /**
   * Atualiza a categoria selecionada no filtro.
   * @param categoria - Nova categoria ou undefined para "Todas"
   * @param setFiltro - Setter do estado de filtro
   */
  public handleCategoriaChange = (
    categoria: ExpenseCategory | undefined,
    setFiltro: SetFiltroFn
  ): void => {
    setFiltro((prev) => ({ ...prev, categoria }));
  };

  /**
   * Atualiza a data de início no filtro.
   * @param data - Data de início no formato YYYY-MM-DD
   * @param setFiltro - Setter do estado de filtro
   */
  public handleDataInicioChange = (
    data: string,
    setFiltro: SetFiltroFn
  ): void => {
    setFiltro((prev) => ({ ...prev, dataInicio: data || undefined }));
  };

  /**
   * Atualiza a data de fim no filtro.
   * @param data - Data de fim no formato YYYY-MM-DD
   * @param setFiltro - Setter do estado de filtro
   */
  public handleDataFimChange = (
    data: string,
    setFiltro: SetFiltroFn
  ): void => {
    setFiltro((prev) => ({ ...prev, dataFim: data || undefined }));
  };

  /**
   * Atualiza o valor mínimo no filtro.
   * @param valor - Valor mínimo como string (entrada do usuário)
   * @param setFiltro - Setter do estado de filtro
   */
  public handleValorMinimoChange = (
    valor: string,
    setFiltro: SetFiltroFn
  ): void => {
    const num = parseFloat(valor.replace(',', '.'));
    setFiltro((prev) => ({
      ...prev,
      valorMinimo: valor === '' ? undefined : isNaN(num) ? undefined : num,
    }));
  };

  /**
   * Atualiza o valor máximo no filtro.
   * @param valor - Valor máximo como string (entrada do usuário)
   * @param setFiltro - Setter do estado de filtro
   */
  public handleValorMaximoChange = (
    valor: string,
    setFiltro: SetFiltroFn
  ): void => {
    const num = parseFloat(valor.replace(',', '.'));
    setFiltro((prev) => ({
      ...prev,
      valorMaximo: valor === '' ? undefined : isNaN(num) ? undefined : num,
    }));
  };

  /**
   * Limpa todos os filtros aplicados, retornando ao estado inicial.
   * @param setFiltro - Setter do estado de filtro
   * @returns Filtro limpo aplicado
   */
  public handleLimparFiltros = (setFiltro: SetFiltroFn): ExpenseFilterModel => {
    const filtroLimpo: ExpenseFilterModel = {};
    setFiltro(filtroLimpo);
    return filtroLimpo;
  };
}

/** Instância singleton do ViewModel de filtro de despesas */
export const expenseFilterViewModel = new ExpenseFilterViewModel();
