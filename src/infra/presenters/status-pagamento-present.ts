import { StatusPagamento } from "../../domain/Status Pagamento/type/status-pagamento-interface";


export class StatusPagamentoPresenter {
  static resposePresenter = (arquivo: StatusPagamento) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (cidades: StatusPagamento[]) => {
    return cidades.map(cidade => StatusPagamentoPresenter.resposePresenter(cidade));
  };
}
