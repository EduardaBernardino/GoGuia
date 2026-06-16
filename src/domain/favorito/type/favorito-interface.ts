import { BaseEntity } from "../../../core/entities/base-entity";
import { Pessoa } from "../../pessoa/type/pessoa-interface";
import { Roteiro } from "../../roteiro/type/roteiro-interface";

export interface FavoritoProps {
    id?: number,
    codRoteiro: number,
    codPessoa: number,
    pessoa?: Pessoa,
    roteiro?: Roteiro,
}

export class Favorito extends BaseEntity<FavoritoProps> {


    static create(props: FavoritoProps): Favorito {
        return new Favorito(props);
    }
}