
import { Roteiro, RoteiroProps } from "../../domain/roteiro/type/roteiro-interface";
import { roteiro } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { RoteiroMapper } from "../mappers/roteiro-mapper";

export class RoteiroRepository {

    async create(roteiroData: Roteiro): Promise<Roteiro | null> {
        const { id, ...props } = roteiroData.data

        const result = await db.insert(roteiro).values(props);

        const createdRoteiro = await db.query.roteiro.findFirst({
            where: eq(roteiro.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdRoteiro) return null;
        return RoteiroMapper.toDomain(createdRoteiro)
    }

    async findAll(): Promise<Roteiro[]> {
        const result = await db.query.roteiro.findMany()

        return result.map((item) => RoteiroMapper.toDomain(item));
    }

    async findById(id: number): Promise<Roteiro | null> {
        const result = await db.query.roteiro.findFirst({
            where: eq(roteiro.id, id),
        })

        if (!result) return null;
        return RoteiroMapper.toDomain(result);
    }

    async update(id: number, data: Partial<RoteiroProps>): Promise<Roteiro | null> {

        const result =await db.update(roteiro).set(data).where(eq(roteiro.id, id));

        const updateRoteiro = await db.query.roteiro.findFirst({
            where: eq(roteiro.id, id)
        });

        if (!result ||!updateRoteiro) return null;

        return RoteiroMapper.toDomain(updateRoteiro);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(roteiro).where(eq(roteiro.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}