/**
 * ViewModel da aba principal (HomeTab).
 * Gerencia o carregamento, exclusão e filtragem de despesas.
 */

import { Dispatch, SetStateAction } from 'react';
import { ExpenseFilterModel, ExpenseModel } from '../../models/expense.model';
import {
  excluirDespesa,
  listarDespesas,
} from '../../services/expenses.service';

/** Setter genérico de estado React */
type SetState<T> = Dispatch<SetStateAction<T>>;

/**
 * ViewModel responsável pela lógica da tela inicial de despesas.
 */
export class HomeTabViewModel {
  /**
   * Carrega a lista de despesas do backend, opcionalmente com filtros.
   * @param setDespesas - Setter da lista de despesas
   * @param setCarregando - Setter do estado de carregamento
   * @param setErro - Setter da mensagem de erro
   * @param filtro - Filtros opcionais a serem aplicados
   */
  public handleCarregarDespesasAsync = async (
    setDespesas: SetState<ExpenseModel[]>,
    setCarregando: SetState<boolean>,
    setErro: SetState<string | null>,
    filtro?: ExpenseFilterModel
  ): Promise<void> => {
    setCarregando(true);
    setErro(null);
    try {
      const despesas = await listarDespesas(filtro);
      setDespesas(despesas);
    } catch (erro) {
      const mensagem =
        erro instanceof Error ? erro.message : 'Erro ao carregar despesas.';
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  /**
   * Exclui uma despesa e recarrega a lista atualizada.
   * @param id - Identificador da despesa a excluir
   * @param setDespesas - Setter da lista de despesas
   * @param setCarregando - Setter do estado de carregamento
   * @param setErro - Setter da mensagem de erro
   * @param filtroAtual - Filtros atualmente aplicados
   */
  public handleExcluirDespesaAsync = async (
    id: number,
    setDespesas: SetState<ExpenseModel[]>,
    setCarregando: SetState<boolean>,
    setErro: SetState<string | null>,
    filtroAtual?: ExpenseFilterModel
  ): Promise<void> => {
    try {
      await excluirDespesa(id);
      await this.handleCarregarDespesasAsync(
        setDespesas,
        setCarregando,
        setErro,
        filtroAtual
      );
    } catch (erro) {
      const mensagem =
        erro instanceof Error ? erro.message : 'Erro ao excluir despesa.';
      setErro(mensagem);
    }
  };

  /**
   * Alterna a visibilidade do painel de filtros.
   * @param setFiltrosVisiveis - Setter do estado de visibilidade dos filtros
   */
  public handleToggleFiltros = (
    setFiltrosVisiveis: SetState<boolean>
  ): void => {
    setFiltrosVisiveis((prev) => !prev);
  };

  /**
   * Aplica novos filtros e recarrega as despesas.
   * @param novoFiltro - Novos filtros selecionados pelo usuário
   * @param setFiltro - Setter do estado de filtro
   * @param setDespesas - Setter da lista de despesas
   * @param setCarregando - Setter do estado de carregamento
   * @param setErro - Setter da mensagem de erro
   */
  public handleAplicarFiltrosAsync = async (
    novoFiltro: ExpenseFilterModel,
    setFiltro: SetState<ExpenseFilterModel>,
    setDespesas: SetState<ExpenseModel[]>,
    setCarregando: SetState<boolean>,
    setErro: SetState<string | null>
  ): Promise<void> => {
    setFiltro(novoFiltro);
    await this.handleCarregarDespesasAsync(
      setDespesas,
      setCarregando,
      setErro,
      novoFiltro
    );
  };

  /**
   * Calcula a soma total dos valores das despesas exibidas.
   * @param despesas - Lista de despesas
   * @returns Soma total dos valores
   */
  public calcularTotalDespesas = (despesas: ExpenseModel[]): number => {
    return despesas.reduce((soma, d) => soma + d.valor, 0);
  };

  /**
   * Formata um valor numérico no padrão monetário brasileiro.
   * @param valor - Valor a ser formatado
   * @returns String no formato R$ X.XXX,XX
   */
  public formatarValorMonetario = (valor: number): string => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
}

/** Instância singleton do ViewModel da aba principal */
export const homeTabViewModel = new HomeTabViewModel();
