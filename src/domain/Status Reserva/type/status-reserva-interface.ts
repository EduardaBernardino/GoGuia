import { BaseEntity } from "../../../core/entities/base-entity";

export interface StatusReservaProps {
    id?: number,
    nome: string,
}

export class StatusReserva extends BaseEntity<StatusReservaProps> {


    static create(props: StatusReservaProps): StatusReserva {
        return new StatusReserva(props);
    }
}