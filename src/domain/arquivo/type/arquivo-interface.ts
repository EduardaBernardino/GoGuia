import { BaseEntity } from "../../../core/entities/base-entity";

export interface ArquivoProps {
    id?: number,
    nomeArquivo?: string,
    localArquivo?: string,
    arquivoAtivo?: boolean,
    codRoteiro: number,
    buffer?: string
}

export class Arquivo extends BaseEntity<ArquivoProps> {


    static create(props: ArquivoProps): Arquivo {
        return new Arquivo(props);
    }
}