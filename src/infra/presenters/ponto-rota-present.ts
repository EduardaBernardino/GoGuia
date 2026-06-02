import { PontoRota } from "../../domain/ponto rota/type/ponto-rota-interface";


export class PontoRotaPresenter {
  static resposePresenter = (arquivo: PontoRota) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (pontoRotas: PontoRota[]) => {
    return pontoRotas.map(pontoRota => PontoRotaPresenter.resposePresenter(pontoRota));
  };
}
