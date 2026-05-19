import { BaseEntity } from "../../../core/entities/base-entity";

export interface CidadeProps {
    id?: number,
    nome: string,
    ufId: number
}

export class Cidade extends BaseEntity<CidadeProps> {


    static create(props: CidadeProps): Cidade {
        return new Cidade(props);
    }
}