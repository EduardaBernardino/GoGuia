import { z } from "zod";

export const updatePagamentoSchema = z.object({
  extras: z.string().optional(),
  valor: z.number("O ufId deve ser um number").int().optional(),
  codReserva: z.number("A reserva deve ser um number").int().optional(),
  codStatusPagamento: z.number("O status pagamento deve ser um number").int().optional(),
  codTipoPagamento: z.number("O tipo pagamento deve ser um number").int().optional(),
});

export const atualizarPagamentoDto = updatePagamentoSchema.partial()
export type UpdatePagamentoDTO = z.infer<typeof atualizarPagamentoDto>;