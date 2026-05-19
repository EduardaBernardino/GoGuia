import { Pessoa } from "../../domain/pessoa/type/pessoa-interface";

export class  PessoaMapper {
  static toDomain(
    raw: any
  ): Pessoa {
    const { ...baseProps } = raw;

    return Pessoa.create({
      ...baseProps
    });
  }

}