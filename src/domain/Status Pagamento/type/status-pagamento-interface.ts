import { BaseEntity } from "../../../core/entities/base-entity";

export interface StatusPagamentoProps {
    id?: number,
    nome: string,
}

export class StatusPagamento extends BaseEntity<StatusPagamentoProps> {


    static create(props: StatusPagamentoProps): StatusPagamento {
        return new StatusPagamento(props);
    }
}