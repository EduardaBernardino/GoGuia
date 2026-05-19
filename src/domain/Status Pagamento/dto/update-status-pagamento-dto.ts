import { z } from "zod";

export const updateStatusPagamentoSchema = z.object({
  nome: z.string().min(3, "Nome muito curto").optional(),
});

export const atualizarStatusPagamentoDto = updateStatusPagamentoSchema.partial()
export type UpdateStatusPagamentoDTO = z.infer<typeof atualizarStatusPagamentoDto>;