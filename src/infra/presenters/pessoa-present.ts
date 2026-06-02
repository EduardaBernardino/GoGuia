import { Pessoa } from "../../domain/pessoa/type/pessoa-interface";


export class PessoaPresenter {
  static resposePresenter = (arquivo: Pessoa) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (pessoas: Pessoa[]) => {
    return pessoas.map(pessoa => PessoaPresenter.resposePresenter(pessoa));
  };
}
