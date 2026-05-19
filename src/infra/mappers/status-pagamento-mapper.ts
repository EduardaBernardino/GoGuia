import { StatusPagamento } from "../../domain/Status Pagamento/type/status-pagamento-interface";

export class  StatusPagamentoMapper {
  static toDomain(
    raw: any
  ): StatusPagamento {
    const { ...baseProps } = raw;

    return StatusPagamento.create({
      ...baseProps
    });
  }

}