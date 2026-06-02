
import { pontoRota } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { PontoRotaMapper } from "../mappers/ponto-rota-mapper";
import { PontoRota, PontoRotaProps } from "../../domain/ponto rota/type/ponto-rota-interface";

export class PontoRotaRepository {

    async create(pontoRotaData: PontoRota): Promise<PontoRota | null> {
        const { id, ...props } = pontoRotaData.data

        const result = await db.insert(pontoRota).values(props);

        const createdPontoRota = await db.query.pontoRota.findFirst({
            where: eq(pontoRota.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdPontoRota) return null;
        return PontoRotaMapper.toDomain(createdPontoRota)
    }

    async findAll(): Promise<PontoRota[]> {
        const result = await db.query.pontoRota.findMany()

        return result.map((item) => PontoRotaMapper.toDomain(item));
    }

    async findById(id: number): Promise<PontoRota | null> {
        const result = await db.query.pontoRota.findFirst({
            where: eq(pontoRota.id, id),
        })

        if (!result) return null;
        return PontoRotaMapper.toDomain(result);
    }

    async update(id: number, data: Partial<PontoRotaProps>): Promise<PontoRota | null> {

        const result =await db.update(pontoRota).set(data).where(eq(pontoRota.id, id));

        const updatePontoRota = await db.query.pontoRota.findFirst({
            where: eq(pontoRota.id, id)
        });

        if (!result ||!updatePontoRota) return null;

        return PontoRotaMapper.toDomain(updatePontoRota);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(pontoRota).where(eq(pontoRota.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}