import { TipoPagamento } from "../../domain/Tipo Pagamento/type/tipo-pagamento-interface";



export class TipoPagamentoPresenter {
  static resposePresenter = (arquivo: TipoPagamento) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (cidades: TipoPagamento[]) => {
    return cidades.map(cidade => TipoPagamentoPresenter.resposePresenter(cidade));
  };
}
