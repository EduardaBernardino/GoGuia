import { Favorito } from "../../domain/favorito/type/favorito-interface";


export class FavoritoPresenter {
  static resposePresenter = (arquivo: Favorito) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (cidades: Favorito[]) => {
    return cidades.map(cidade => FavoritoPresenter.resposePresenter(cidade));
  };
}
