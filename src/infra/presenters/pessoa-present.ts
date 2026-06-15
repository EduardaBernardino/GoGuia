import { Pessoa } from "../../domain/pessoa/type/pessoa-interface";


export class PessoaPresenter {
  static resposePresenter = (arquivo: Pessoa, tokenVerifc?: string) => {
    const { senha ,...baseProps } = arquivo.data;
    return {
      ...baseProps,
      token: tokenVerifc
    };
  };

  static listaResposePresenter = (pessoas: Pessoa[]) => {
    return pessoas.map(pessoa => PessoaPresenter.resposePresenter(pessoa));
  };
}
