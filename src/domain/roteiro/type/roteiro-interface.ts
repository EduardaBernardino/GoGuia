import { BaseEntity } from "../../../core/entities/base-entity";

export interface RoteiroProps {
    id?: number,
    titulo: string,
    descricao: string,
    local: string,
    preco: number,
    desconto?: number | null,
    codStatusRoteiro: number,
    codGuia: number,
    codRota: number,
}

export class Roteiro extends BaseEntity<RoteiroProps> {


    static create(props: RoteiroProps): Roteiro {
        return new Roteiro(props);
    }
}