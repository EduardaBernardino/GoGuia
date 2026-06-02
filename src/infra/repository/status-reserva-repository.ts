
import { statusReserva } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { StatusReserva, StatusReservaProps } from "../../domain/Status Reserva/type/status-reserva-interface";
import { StatusReservaMapper } from "../mappers/status-reserva-mapper";

export class StatusReservaRepository {

    async create(statusReservaData: StatusReserva): Promise<StatusReserva | null> {
        const { id, ...props } = statusReservaData.data

        const result = await db.insert(statusReserva).values(props);

        const createdStatusReserva = await db.query.statusReserva.findFirst({
            where: eq(statusReserva.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdStatusReserva) return null;
        return StatusReservaMapper.toDomain(createdStatusReserva)
    }

    async findAll(): Promise<StatusReserva[]> {
        const result = await db.query.statusReserva.findMany()

        return result.map((item) => StatusReservaMapper.toDomain(item));
    }

    async findById(id: number): Promise<StatusReserva | null> {
        const result = await db.query.statusReserva.findFirst({
            where: eq(statusReserva.id, id),
        })

        if (!result) return null;
        return StatusReservaMapper.toDomain(result);
    }

    async update(id: number, data: Partial<StatusReservaProps>): Promise<StatusReserva | null> {

        const result =await db.update(statusReserva).set(data).where(eq(statusReserva.id, id));

        const updateStatusReserva = await db.query.statusReserva.findFirst({
            where: eq(statusReserva.id, id)
        });

        if (!result ||!updateStatusReserva) return null;

        return StatusReservaMapper.toDomain(updateStatusReserva);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(statusReserva).where(eq(statusReserva.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}