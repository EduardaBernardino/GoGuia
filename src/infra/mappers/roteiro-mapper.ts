import { Roteiro } from "../../domain/roteiro/type/roteiro-interface";

export class  RoteiroMapper {
  static toDomain(
    raw: any
  ): Roteiro {
    const { ...baseProps } = raw;

    return Roteiro.create({
      ...baseProps
    });
  }

}