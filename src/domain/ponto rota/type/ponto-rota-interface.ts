import { BaseEntity } from "../../../core/entities/base-entity";

export interface PontoRotaProps {
    id?: number,
    coordenada: [number, number]
    posicao: number,
    codRota: number
}

export class PontoRota extends BaseEntity<PontoRotaProps> {


    static create(props: PontoRotaProps): PontoRota {
        return new PontoRota(props);
    }
}