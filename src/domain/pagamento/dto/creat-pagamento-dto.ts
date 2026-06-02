import { z } from "zod";

export const createPagamentoSchema = z.object({
  extras: z.string(),
  valor: z.number("O ufId deve ser um number").int(),
  codReserva: z.number("A reserva deve ser um number").int(),
  codStatusPagamento: z.number("O status pagamento deve ser um number").int(),
  codTipoPagamento: z.number("O tipo pagamento deve ser um number").int(),
});

export type CreatePagamentoDTO = z.infer<typeof createPagamentoSchema>;