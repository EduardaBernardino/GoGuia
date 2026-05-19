import { Rota } from "../../domain/rota/type/rota-interface";


export class RotaPresenter {
  static resposePresenter = (arquivo: Rota) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (rotas: Rota[]) => {
    return rotas.map(rota => RotaPresenter.resposePresenter(rota));
  };
}
