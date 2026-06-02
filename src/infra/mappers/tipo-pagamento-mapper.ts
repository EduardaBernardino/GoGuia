import { TipoPagamento } from "../../domain/Tipo Pagamento/type/tipo-pagamento-interface";


export class  TipoPagamentoMapper {
  static toDomain(
    raw: any
  ): TipoPagamento {
    const { ...baseProps } = raw;

    return TipoPagamento.create({
      ...baseProps
    });
  }

}