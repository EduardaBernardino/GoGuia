import { BaseEntity } from "../../../core/entities/base-entity";

export interface PerfilProps {
    id?: number,
    nome: string,
}

export class Perfil extends BaseEntity<PerfilProps> {


    static create(props: PerfilProps): Perfil {
        return new Perfil(props);
    }
}