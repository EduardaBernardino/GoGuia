import { z } from "zod";

export const createPontoRotaSchema = z.object({
  coordenada: z.tuple([ z.number(), z.number()]),
  posicao: z.number("Deve ser um number").int(),
  codRota: z.number("Deve ser um number").int()
});

export type CreatePontoRotaDTO = z.infer<typeof createPontoRotaSchema>;