import { Roteiro } from "../../domain/roteiro/type/roteiro-interface";


export class RoteiroPresenter {
  static resposePresenter = (arquivo: Roteiro) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (roteiros: Roteiro[]) => {
    return roteiros.map(roteiro => RoteiroPresenter.resposePresenter(roteiro));
  };
}
