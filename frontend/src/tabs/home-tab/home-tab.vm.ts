import { Dispatch, SetStateAction } from "react";
import { ExpenseFilterModel, ExpenseModel } from "../../models/expense.model";
import {
  excluirDespesa,
  listarDespesas,
} from "../../services/expenses.service";

type SetState<T> = Dispatch<SetStateAction<T>>;

export class HomeTabViewModel {
  /**
   * Carrega a lista de despesas do backend, opcionalmente com filtros.
   * @param setExpenses - Setter da lista de despesas
   * @param setLoading - Setter do estado de carregamento
   * @param setError  - Setter da mensagem de erro
   * @param filter - Filtros opcionais a serem aplicados
   */
  public handleLoadExpensesAsync = async (
    setExpenses: SetState<ExpenseModel[]>,
    setLoading: SetState<boolean>,
    setError: SetState<string | null>,
    filter?: ExpenseFilterModel,
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const despesas = await listarDespesas(filter);
      setExpenses(despesas);
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro ao carregar despesas.";
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Exclui uma despesa e recarrega a lista atualizada.
   * @param id - Identificador da despesa a excluir
   * @param setExpenses - Setter da lista de despesas
   * @param setLoading - Setter do estado de carregamento
   * @param setError - Setter da mensagem de erro
   * @param currentFilter - Filtros atualmente aplicados
   */
  public handleDeleteExpenseAsync = async (
    id: number,
    setExpenses: SetState<ExpenseModel[]>,
    setLoading: SetState<boolean>,
    setError: SetState<string | null>,
    currentFilter?: ExpenseFilterModel,
  ): Promise<void> => {
    try {
      await excluirDespesa(id);
      await this.handleLoadExpensesAsync(
        setExpenses,
        setLoading,
        setError,
        currentFilter,
      );
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro ao excluir despesa.";
      setError(mensagem);
    }
  };

  /**
   * Alterna a visibilidade do painel de filtros.
   * @param setFiltrosVisiveis - Setter do estado de visibilidade dos filtros
   */
  public handleToggleFilters = (setVisibleFilters: SetState<boolean>): void => {
    setVisibleFilters((prev) => !prev);
  };

  /**
   * Aplica novos filtros e recarrega as despesas.
   * @param newFilter - Novos filtros selecionados pelo usuário
   * @param setFilter - Setter do estado de filtro
   * @param setExpenses - Setter da lista de despesas
   * @param setLoading - Setter do estado de carregamento
   * @param setError - Setter da mensagem de erro
   */
  public handleApplyFiltersAsync = async (
    newFilter: ExpenseFilterModel,
    setFilter: SetState<ExpenseFilterModel>,
    setExpenses: SetState<ExpenseModel[]>,
    setLoading: SetState<boolean>,
    setError: SetState<string | null>,
  ): Promise<void> => {
    setFilter(newFilter);
    await this.handleLoadExpensesAsync(
      setExpenses,
      setLoading,
      setError,
      newFilter,
    );
  };

  /**
   * Calcula a soma total dos valores das despesas exibidas.
   * @param expenses - Lista de despesas
   * @returns Soma total dos valores
   */
  public sumExpenses = (expenses: ExpenseModel[]): number => {
    return expenses.reduce((sum, e) => sum + e.value, 0);
  };

  /**
   * Formata um valor numérico no padrão monetário brasileiro.
   * @param value - Valor a ser formatado
   * @returns String no formato R$ X.XXX,XX
   */
  public formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
}

/** Instância singleton do ViewModel da aba principal */
export const homeTabViewModel = new HomeTabViewModel();
