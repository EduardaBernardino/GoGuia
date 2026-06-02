
import { Rota, RotaProps } from "../../domain/rota/type/rota-interface";
import { rota } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { RotaMapper } from "../mappers/rota-mapper";

export class RotaRepository {

    async create(rotaData: Rota): Promise<Rota | null> {
        const { id, ...props } = rotaData.data

        const result = await db.insert(rota).values(props);

        const createdRota = await db.query.rota.findFirst({
            where: eq(rota.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdRota) return null;
        return RotaMapper.toDomain(createdRota)
    }

    async findAll(): Promise<Rota[]> {
        const result = await db.query.rota.findMany()

        return result.map((item) => RotaMapper.toDomain(item));
    }

    async findById(id: number): Promise<Rota | null> {
        const result = await db.query.rota.findFirst({
            where: eq(rota.id, id),
        })

        if (!result) return null;
        return RotaMapper.toDomain(result);
    }

    async update(id: number, data: Partial<RotaProps>): Promise<Rota | null> {

        const result =await db.update(rota).set(data).where(eq(rota.id, id));

        const updateRota = await db.query.rota.findFirst({
            where: eq(rota.id, id)
        });

        if (!result ||!updateRota) return null;

        return RotaMapper.toDomain(updateRota);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(rota).where(eq(rota.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}