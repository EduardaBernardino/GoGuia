import { StatusReserva } from "../../domain/Status Reserva/type/status-reserva-interface";

export class  StatusReservaMapper {
  static toDomain(
    raw: any
  ): StatusReserva {
    const { ...baseProps } = raw;

    return StatusReserva.create({
      ...baseProps
    });
  }

}