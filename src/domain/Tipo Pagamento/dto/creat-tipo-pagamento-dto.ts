import { z } from "zod";

export const createTipoPagamentoSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
});

export type CreateTipoPagamentoDTO = z.infer<typeof createTipoPagamentoSchema>;