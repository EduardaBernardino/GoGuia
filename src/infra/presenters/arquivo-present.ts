import { Arquivo } from "../../domain/arquivo/type/arquivo-interface";


export class ArquivoPresenter {
  static resposePresenter = (arquivo: Arquivo) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (cidades: Arquivo[]) => {
    return cidades.map(cidade => ArquivoPresenter.resposePresenter(cidade));
  };
}
