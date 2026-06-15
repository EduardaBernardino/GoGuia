import { Arquivo } from "../../domain/arquivo/type/arquivo-interface";

export class  ArquivoMapper {
  static toDomain(
    raw: any
  ): Arquivo {
    const { ...baseProps } = raw;

    return Arquivo.create({
      ...baseProps
    });
  }

}