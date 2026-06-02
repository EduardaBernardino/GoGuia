import { StatusRoteiro } from "../../domain/Status Roteiro/type/status-roteiro-interface";


export class StatusRoteiroPresenter {
  static resposePresenter = (arquivo: StatusRoteiro) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (cidades: StatusRoteiro[]) => {
    return cidades.map(cidade => StatusRoteiroPresenter.resposePresenter(cidade));
  };
}
