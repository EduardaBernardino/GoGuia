import { z } from "zod";

export const updateCidadeSchema = z.object({
  nome: z.string().min(3, "Nome muito curto").optional(),
  ufId: z.number("O ufId deve ser um number").int().optional(),
});

export const atualizarCidadeDto = updateCidadeSchema.partial()
export type UpdateCidadeDTO = z.infer<typeof atualizarCidadeDto>;