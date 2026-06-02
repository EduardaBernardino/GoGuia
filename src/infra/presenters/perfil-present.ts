import { Perfil } from "../../domain/perfil/type/perfil-interface";


export class PerfilPresenter {
  static resposePresenter = (arquivo: Perfil) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (cidades: Perfil[]) => {
    return cidades.map(cidade => PerfilPresenter.resposePresenter(cidade));
  };
}
