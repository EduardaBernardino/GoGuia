import { BaseEntity } from "../../../core/entities/base-entity";

export interface PagamentoProps {
    id?: number,
    extras: string,
    valor: number,
    codReserva: number,
    codStatusPagamento: number,
    codTipoPagamento: number,
}

export class Pagamento extends BaseEntity<PagamentoProps> {


    static create(props: PagamentoProps): Pagamento {
        return new Pagamento(props);
    }
}