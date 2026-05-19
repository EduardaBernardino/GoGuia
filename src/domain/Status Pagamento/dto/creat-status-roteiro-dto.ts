import { z } from "zod";

export const createStatusPagamentoSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
});

export type CreateStatusPagamentoDTO = z.infer<typeof createStatusPagamentoSchema>;