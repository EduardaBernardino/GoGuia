
import { statusPagamento } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { StatusPagamento, StatusPagamentoProps } from "../../domain/Status Pagamento/type/status-pagamento-interface";
import { StatusPagamentoMapper } from "../mappers/status-pagamento-mapper";

export class StatusPagamentoRepository {

    async create(statusPagamentoData: StatusPagamento): Promise<StatusPagamento | null> {
        const { id, ...props } = statusPagamentoData.data

        const result = await db.insert(statusPagamento).values(props);

        const createdStatusPagamento = await db.query.statusPagamento.findFirst({
            where: eq(statusPagamento.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdStatusPagamento) return null;
        return StatusPagamentoMapper.toDomain(createdStatusPagamento)
    }

    async findAll(): Promise<StatusPagamento[]> {
        const result = await db.query.statusPagamento.findMany()

        return result.map((item) => StatusPagamentoMapper.toDomain(item));
    }

    async findById(id: number): Promise<StatusPagamento | null> {
        const result = await db.query.statusPagamento.findFirst({
            where: eq(statusPagamento.id, id),
        })

        if (!result) return null;
        return StatusPagamentoMapper.toDomain(result);
    }

    async update(id: number, data: Partial<StatusPagamentoProps>): Promise<StatusPagamento | null> {

        const result =await db.update(statusPagamento).set(data).where(eq(statusPagamento.id, id));

        const updateStatusPagamento = await db.query.statusPagamento.findFirst({
            where: eq(statusPagamento.id, id)
        });

        if (!result ||!updateStatusPagamento) return null;

        return StatusPagamentoMapper.toDomain(updateStatusPagamento);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(statusPagamento).where(eq(statusPagamento.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}