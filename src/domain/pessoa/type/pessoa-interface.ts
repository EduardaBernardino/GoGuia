import { BaseEntity } from "../../../core/entities/base-entity";

export interface PessoaProps {
    id?: number,
    nome: string,
    email: string,
    senha: string,
    numTelefone: string,
    codPerfil: number
}

export class Pessoa extends BaseEntity<PessoaProps> {


    static create(props: PessoaProps): Pessoa {
        return new Pessoa(props);
    }
}