import { BaseEntity } from "../../../core/entities/base-entity";

export interface TipoPagamentoProps {
    id?: number,
    nome: string,
}

export class TipoPagamento extends BaseEntity<TipoPagamentoProps> {


    static create(props: TipoPagamentoProps): TipoPagamento {
        return new TipoPagamento(props);
    }
}