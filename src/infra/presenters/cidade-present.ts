import { Cidade } from "../../domain/cidade/type/cidade-interface";


export class CidadePresenter {
  static resposePresenter = (arquivo: Cidade) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (cidades: Cidade[]) => {
    return cidades.map(cidade => CidadePresenter.resposePresenter(cidade));
  };
}
