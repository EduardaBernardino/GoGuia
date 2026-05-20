
import { Reserva, ReservaProps } from "../../domain/reserva/type/reserva-interface";
import { reserva } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { ReservaMapper } from "../mappers/reserva-mapper";

export class ReservaRepository {

    async create(reservaData: Reserva): Promise<Reserva | null> {
        const { id, ...props } = reservaData.data

        const result = await db.insert(reserva).values(props);

        const createdReserva = await db.query.reserva.findFirst({
            where: eq(reserva.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdReserva) return null;
        return ReservaMapper.toDomain(createdReserva)
    }

    async findAll(): Promise<Reserva[]> {
        const result = await db.query.reserva.findMany()

        return result.map((item) => ReservaMapper.toDomain(item));
    }

    async findById(id: number): Promise<Reserva | null> {
        const result = await db.query.reserva.findFirst({
            where: eq(reserva.id, id),
        })

        if (!result) return null;
        return ReservaMapper.toDomain(result);
    }

    async update(id: number, data: Partial<ReservaProps>): Promise<Reserva | null> {

        const result =await db.update(reserva).set(data).where(eq(reserva.id, id));

        const updateReserva = await db.query.reserva.findFirst({
            where: eq(reserva.id, id)
        });

        if (!result ||!updateReserva) return null;

        return ReservaMapper.toDomain(updateReserva);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(reserva).where(eq(reserva.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}