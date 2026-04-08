/**
 * ViewModel da aba de adição de despesas (AddExpenseTab).
 * Gerencia a lógica de validação e submissão do formulário.
 */

import { Dispatch, SetStateAction } from 'react';
import {
  ExpenseCategory,
  ExpenseModel,
} from '../../models/expense.model';
import { criarDespesa } from '../../services/expenses.service';

/** Setter genérico de estado React */
type SetState<T> = Dispatch<SetStateAction<T>>;

/**
 * ViewModel responsável pela lógica do formulário de adição de despesa.
 */
export class AddExpenseTabViewModel {
  /**
   * Atualiza o campo de descrição no estado do formulário.
   * @param texto - Novo valor digitado
   * @param setDescricao - Setter do estado de descrição
   */
  public handleDescricaoChange = (
    texto: string,
    setDescricao: SetState<string>
  ): void => {
    setDescricao(texto);
  };

  /**
   * Atualiza o campo de valor no estado do formulário.
   * Aceita apenas caracteres numéricos e separadores decimais.
   * @param texto - Novo valor digitado
   * @param setValor - Setter do estado de valor
   */
  public handleValorChange = (
    texto: string,
    setValor: SetState<string>
  ): void => {
    // Permite apenas dígitos, vírgula e ponto
    const sanitizado = texto.replace(/[^0-9.,]/g, '');
    setValor(sanitizado);
  };

  /**
   * Atualiza o campo de data no estado do formulário.
   * @param texto - Nova data digitada
   * @param setData - Setter do estado de data
   */
  public handleDataChange = (
    texto: string,
    setData: SetState<string>
  ): void => {
    setData(texto);
  };

  /**
   * Atualiza a categoria selecionada no formulário.
   * @param categoria - Categoria escolhida
   * @param setCategoria - Setter do estado de categoria
   */
  public handleCategoriaChange = (
    categoria: ExpenseCategory,
    setCategoria: SetState<ExpenseCategory>
  ): void => {
    setCategoria(categoria);
  };

  /**
   * Atualiza o campo de observações no formulário.
   * @param texto - Novo texto digitado
   * @param setObservacoes - Setter do estado de observações
   */
  public handleObservacoesChange = (
    texto: string,
    setObservacoes: SetState<string>
  ): void => {
    setObservacoes(texto);
  };

  /**
   * Valida os campos do formulário e retorna lista de erros.
   * @param descricao - Descrição da despesa
   * @param valor - Valor como string
   * @param data - Data como string
   * @returns Array de mensagens de erro (vazio se válido)
   */
  public validarFormulario = (
    descricao: string,
    valor: string,
    data: string
  ): string[] => {
    const erros: string[] = [];

    if (!descricao.trim()) {
      erros.push('A descrição é obrigatória.');
    }

    const valorNum = parseFloat(valor.replace(',', '.'));
    if (!valor.trim() || isNaN(valorNum) || valorNum <= 0) {
      erros.push('Informe um valor válido e maior que zero.');
    }

    if (!data.trim()) {
      erros.push('A data é obrigatória.');
    } else {
      const regexData = /^\d{4}-\d{2}-\d{2}$/;
      if (!regexData.test(data)) {
        erros.push('A data deve estar no formato AAAA-MM-DD.');
      }
    }

    return erros;
  };

  /**
   * Salva a nova despesa no backend.
   * @param descricao - Descrição da despesa
   * @param valor - Valor como string
   * @param data - Data no formato YYYY-MM-DD
   * @param categoria - Categoria selecionada
   * @param observacoes - Observações opcionais
   * @param setSalvando - Setter do estado de loading
   * @param setErros - Setter da lista de erros
   * @param setSucesso - Setter do estado de sucesso
   * @param onSucesso - Callback opcional chamado após salvar com sucesso
   */
  public handleSalvarDespesaAsync = async (
    descricao: string,
    valor: string,
    data: string,
    categoria: ExpenseCategory,
    observacoes: string,
    setSalvando: SetState<boolean>,
    setErros: SetState<string[]>,
    setSucesso: SetState<boolean>,
    onSucesso?: (despesa: ExpenseModel) => void
  ): Promise<void> => {
    const erros = this.validarFormulario(descricao, valor, data);
    if (erros.length > 0) {
      setErros(erros);
      return;
    }

    setSalvando(true);
    setErros([]);

    try {
      const valorNum = parseFloat(valor.replace(',', '.'));
      const despesaCriada = await criarDespesa({
        descricao: descricao.trim(),
        valor: valorNum,
        data,
        categoria,
        observacoes: observacoes.trim() || undefined,
      });

      setSucesso(true);
      onSucesso?.(despesaCriada);
    } catch (erro) {
      const mensagem =
        erro instanceof Error ? erro.message : 'Erro ao salvar despesa.';
      setErros([mensagem]);
    } finally {
      setSalvando(false);
    }
  };

  /**
   * Retorna a data atual no formato YYYY-MM-DD.
   * @returns Data atual formatada
   */
  public obterDataAtual = (): string => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };
}

/** Instância singleton do ViewModel da aba de adição */
export const addExpenseTabViewModel = new AddExpenseTabViewModel();
