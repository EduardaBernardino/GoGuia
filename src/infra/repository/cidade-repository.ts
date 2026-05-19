
import { Cidade, CidadeProps } from "../../domain/cidade/type/cidade-interface";
import { cidade } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { CidadeMapper } from "../mappers/cidade-mapper";

export class CidadeRepository {

    async create(cidadeData: Cidade): Promise<Cidade | null> {
        const { id, ...props } = cidadeData.data

        const result = await db.insert(cidade).values(props);

        const createdCidade = await db.query.cidade.findFirst({
            where: eq(cidade.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdCidade) return null;
        return CidadeMapper.toDomain(createdCidade)
    }

    async findAll(): Promise<Cidade[]> {
        const result = await db.query.cidade.findMany()

        return result.map((item) => CidadeMapper.toDomain(item));
    }

    async findById(id: number): Promise<Cidade | null> {
        const result = await db.query.cidade.findFirst({
            where: eq(cidade.id, id),
        })

        if (!result) return null;
        return CidadeMapper.toDomain(result);
    }

    async update(id: number, data: Partial<CidadeProps>): Promise<Cidade | null> {

        const result =await db.update(cidade).set(data).where(eq(cidade.id, id));

        const updateCidade = await db.query.cidade.findFirst({
            where: eq(cidade.id, id)
        });

        if (!result ||!updateCidade) return null;

        return CidadeMapper.toDomain(updateCidade);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(cidade).where(eq(cidade.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}