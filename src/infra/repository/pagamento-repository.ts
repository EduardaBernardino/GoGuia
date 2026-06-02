
import { Pagamento, PagamentoProps } from "../../domain/pagamento/type/pagamento-interface";
import { pagamento } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { PagamentoMapper } from "../mappers/pagamento-mapper";

export class PagamentoRepository {

    async create(pagamentoData: Pagamento): Promise<Pagamento | null> {
        const { id, ...props } = pagamentoData.data

        const result = await db.insert(pagamento).values(props);

        const createdPagamento = await db.query.pagamento.findFirst({
            where: eq(pagamento.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdPagamento) return null;
        return PagamentoMapper.toDomain(createdPagamento)
    }

    async findAll(): Promise<Pagamento[]> {
        const result = await db.query.pagamento.findMany()

        return result.map((item) => PagamentoMapper.toDomain(item));
    }

    async findById(id: number): Promise<Pagamento | null> {
        const result = await db.query.pagamento.findFirst({
            where: eq(pagamento.id, id),
        })

        if (!result) return null;
        return PagamentoMapper.toDomain(result);
    }

    async update(id: number, data: Partial<PagamentoProps>): Promise<Pagamento | null> {

        const result = await db.update(pagamento).set(data).where(eq(pagamento.id, id));

        const updatePagamento = await db.query.pagamento.findFirst({
            where: eq(pagamento.id, id)
        });

        if (!result || !updatePagamento) return null;

        return PagamentoMapper.toDomain(updatePagamento);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(pagamento).where(eq(pagamento.id, id));

        if (!(result.changes > 0)) return null;

        return id
    }
}