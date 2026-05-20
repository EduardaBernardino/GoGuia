import { Pagamento } from "../../domain/pagamento/type/pagamento-interface";


export class PagamentoPresenter {
  static resposePresenter = (arquivo: Pagamento) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (pagamentos: Pagamento[]) => {
    return pagamentos.map(pagamento => PagamentoPresenter.resposePresenter(pagamento));
  };
}
