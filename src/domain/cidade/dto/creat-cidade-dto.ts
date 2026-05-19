import { z } from "zod";

export const createCidadeSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  ufId: z.number("O ufId deve ser um number").int(),
});

export type CreateCidadeDTO = z.infer<typeof createCidadeSchema>;