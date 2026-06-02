import { BaseEntity } from "../../../core/entities/base-entity";

export interface StatusRoteiroProps {
    id?: number,
    nome: string,
}

export class StatusRoteiro extends BaseEntity<StatusRoteiroProps> {


    static create(props: StatusRoteiroProps): StatusRoteiro {
        return new StatusRoteiro(props);
    }
}