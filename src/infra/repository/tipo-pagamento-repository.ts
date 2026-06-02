
import { tipoPagamento } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { TipoPagamento, TipoPagamentoProps } from "../../domain/Tipo Pagamento/type/tipo-pagamento-interface";
import { TipoPagamentoMapper } from "../mappers/tipo-pagamento-mapper";


export class TipoPagamentoRepository {

    async create(tipoPagamentoData: TipoPagamento): Promise<TipoPagamento | null> {
        const { id, ...props } = tipoPagamentoData.data

        const result = await db.insert(tipoPagamento).values(props);

        const createdTipoPagamento = await db.query.tipoPagamento.findFirst({
            where: eq(tipoPagamento.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdTipoPagamento) return null;
        return TipoPagamentoMapper.toDomain(createdTipoPagamento)
    }

    async findAll(): Promise<TipoPagamento[]> {
        const result = await db.query.tipoPagamento.findMany()

        return result.map((item) => TipoPagamentoMapper.toDomain(item));
    }

    async findById(id: number): Promise<TipoPagamento | null> {
        const result = await db.query.tipoPagamento.findFirst({
            where: eq(tipoPagamento.id, id),
        })

        if (!result) return null;
        return TipoPagamentoMapper.toDomain(result);
    }

    async update(id: number, data: Partial<TipoPagamentoProps>): Promise<TipoPagamento | null> {

        const result =await db.update(tipoPagamento).set(data).where(eq(tipoPagamento.id, id));

        const updateTipoPagamento = await db.query.tipoPagamento.findFirst({
            where: eq(tipoPagamento.id, id)
        });

        if (!result ||!updateTipoPagamento) return null;

        return TipoPagamentoMapper.toDomain(updateTipoPagamento);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(tipoPagamento).where(eq(tipoPagamento.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}