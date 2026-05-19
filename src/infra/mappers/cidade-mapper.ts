import { Cidade } from "../../domain/cidade/type/cidade-interface";

export class  CidadeMapper {
  static toDomain(
    raw: any
  ): Cidade {
    const { ...baseProps } = raw;

    return Cidade.create({
      ...baseProps
    });
  }

}