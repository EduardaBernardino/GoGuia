import { z } from "zod";

export const updatePontoRotaSchema = z.object({
  coordenada: z.tuple([ z.number(), z.number()]).optional(),
  posicao: z.number("Deve ser um number").int().optional(),
  codRota: z.number("Deve ser um number").int().optional(),
});

export const atualizarPontoRotaDto = updatePontoRotaSchema.partial()
export type UpdatePontoRotaDTO = z.infer<typeof atualizarPontoRotaDto>;