import { BaseEntity } from "../../../core/entities/base-entity";

export interface ReservaProps {
    id?: number,
    data: Date,
    quantPessoas: number,
    codGuia: number,
    codStatusReserva: number,
    codTurista: number,
    codRoteiro: number,
}

export class Reserva extends BaseEntity<ReservaProps> {


    static create(props: ReservaProps): Reserva {
        return new Reserva(props);
    }
}