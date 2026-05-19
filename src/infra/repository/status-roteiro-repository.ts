
import { statusRoteiro } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { StatusRoteiro, StatusRoteiroProps } from "../../domain/Status Roteiro/type/status-roteiro-interface";
import { StatusRoteiroMapper } from "../mappers/status-roteiro-mapper";

export class StatusRoteiroRepository {

    async create(statusRoteiroData: StatusRoteiro): Promise<StatusRoteiro | null> {
        const { id, ...props } = statusRoteiroData.data

        const result = await db.insert(statusRoteiro).values(props);

        const createdStatusRoteiro = await db.query.statusRoteiro.findFirst({
            where: eq(statusRoteiro.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdStatusRoteiro) return null;
        return StatusRoteiroMapper.toDomain(createdStatusRoteiro)
    }

    async findAll(): Promise<StatusRoteiro[]> {
        const result = await db.query.statusRoteiro.findMany()

        return result.map((item) => StatusRoteiroMapper.toDomain(item));
    }

    async findById(id: number): Promise<StatusRoteiro | null> {
        const result = await db.query.statusRoteiro.findFirst({
            where: eq(statusRoteiro.id, id),
        })

        if (!result) return null;
        return StatusRoteiroMapper.toDomain(result);
    }

    async update(id: number, data: Partial<StatusRoteiroProps>): Promise<StatusRoteiro | null> {

        const result =await db.update(statusRoteiro).set(data).where(eq(statusRoteiro.id, id));

        const updateStatusRoteiro = await db.query.statusRoteiro.findFirst({
            where: eq(statusRoteiro.id, id)
        });

        if (!result ||!updateStatusRoteiro) return null;

        return StatusRoteiroMapper.toDomain(updateStatusRoteiro);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(statusRoteiro).where(eq(statusRoteiro.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}