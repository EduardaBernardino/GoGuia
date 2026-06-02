import { StatusRoteiro } from "../../domain/Status Roteiro/type/status-roteiro-interface";

export class  StatusRoteiroMapper {
  static toDomain(
    raw: any
  ): StatusRoteiro {
    const { ...baseProps } = raw;

    return StatusRoteiro.create({
      ...baseProps
    });
  }

}