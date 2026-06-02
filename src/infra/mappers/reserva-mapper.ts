import { Reserva } from "../../domain/reserva/type/reserva-interface";

export class  ReservaMapper {
  static toDomain(
    raw: any
  ): Reserva {
    const { ...baseProps } = raw;

    return Reserva.create({
      ...baseProps
    });
  }

}