import { PontoRota } from "../../domain/ponto rota/type/ponto-rota-interface";

export class  PontoRotaMapper {
  static toDomain(
    raw: any
  ): PontoRota {
    const { ...baseProps } = raw;

    return PontoRota.create({
      ...baseProps
    });
  }

}