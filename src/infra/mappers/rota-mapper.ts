import { Rota } from "../../domain/rota/type/rota-interface";

export class  RotaMapper {
  static toDomain(
    raw: any
  ): Rota {
    const { ...baseProps } = raw;

    return Rota.create({
      ...baseProps
    });
  }

}