import { Pagamento } from "../../domain/pagamento/type/pagamento-interface";

export class PagamentoMapper {
  static toDomain(
    raw: any
  ): Pagamento {
    const { ...baseProps } = raw;

    return Pagamento.create({
      ...baseProps
    });
  }

}