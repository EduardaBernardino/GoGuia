import { z } from "zod";

export const updateTipoPagamentoSchema = z.object({
  nome: z.string().min(3, "Nome muito curto").optional(),
});

export const atualizarTipoPagamentoDto = updateTipoPagamentoSchema.partial()
export type UpdateTipoPagamentoDTO = z.infer<typeof atualizarTipoPagamentoDto>;