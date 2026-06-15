
import { Arquivo, ArquivoProps } from "../../domain/arquivo/type/arquivo-interface";
import { arquivo } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { ArquivoMapper } from "../mappers/arquivo-mapper";

export class ArquivoRepository {

    async create(arquivoData: Arquivo): Promise<Arquivo | null> {
        const { id, ...props } = arquivoData.data

        const result = await db.insert(arquivo).values(props);

        const createdArquivo = await db.query.arquivo.findFirst({
            where: eq(arquivo.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdArquivo) return null;
        return ArquivoMapper.toDomain(createdArquivo)
    }

    async findAll(): Promise<Arquivo[]> {
        const result = await db.query.arquivo.findMany()

        return result.map((item) => ArquivoMapper.toDomain(item));
    }

    async findById(id: number): Promise<Arquivo | null> {
        const result = await db.query.arquivo.findFirst({
            where: eq(arquivo.id, id),
        })

        if (!result) return null;
        return ArquivoMapper.toDomain(result);
    }

    async update(id: number, data: Partial<ArquivoProps>): Promise<Arquivo | null> {

        const result =await db.update(arquivo).set(data).where(eq(arquivo.id, id));

        const updateArquivo = await db.query.arquivo.findFirst({
            where: eq(arquivo.id, id)
        });

        if (!result ||!updateArquivo) return null;

        return ArquivoMapper.toDomain(updateArquivo);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(arquivo).where(eq(arquivo.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}