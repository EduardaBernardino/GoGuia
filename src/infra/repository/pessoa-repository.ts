
import { Pessoa, PessoaProps } from "../../domain/pessoa/type/pessoa-interface";
import { pessoa } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { PessoaMapper } from "../mappers/pessoa-mapper";

export class PessoaRepository {

    async create(pessoaData: Pessoa): Promise<Pessoa | null> {
        const { id, ...props } = pessoaData.data

        const result = await db.insert(pessoa).values(props);

        const createdPessoa = await db.query.pessoa.findFirst({
            where: eq(pessoa.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdPessoa) return null;
        return PessoaMapper.toDomain(createdPessoa)
    }

    async findAll(): Promise<Pessoa[]> {
        const result = await db.query.pessoa.findMany()

        return result.map((item) => PessoaMapper.toDomain(item));
    }

    async findById(id: number): Promise<Pessoa | null> {
        const result = await db.query.pessoa.findFirst({
            where: eq(pessoa.id, id),
        })

        if (!result) return null;
        return PessoaMapper.toDomain(result);
    }

    async update(id: number, data: Partial<PessoaProps>): Promise<Pessoa | null> {

        const result =await db.update(pessoa).set(data).where(eq(pessoa.id, id));

        const updatePessoa = await db.query.pessoa.findFirst({
            where: eq(pessoa.id, id)
        });

        if (!result ||!updatePessoa) return null;

        return PessoaMapper.toDomain(updatePessoa);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(pessoa).where(eq(pessoa.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}