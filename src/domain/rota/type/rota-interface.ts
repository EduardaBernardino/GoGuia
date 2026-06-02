import { BaseEntity } from "../../../core/entities/base-entity";

export interface RotaProps {
    id?: number,
    tempo: string,
    distancia: number
}

export class Rota extends BaseEntity<RotaProps> {


    static create(props: RotaProps): Rota {
        return new Rota(props);
    }
}