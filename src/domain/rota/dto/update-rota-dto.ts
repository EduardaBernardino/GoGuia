import { z } from "zod";

export const updateRotaSchema = z.object({
  tempo: z.string("Deve ser um numero").optional(),
  distancia: z.int("Deve ser um inteiro").optional()
});

export const atualizarRotaDto = updateRotaSchema.partial()
export type UpdateRotaDTO = z.infer<typeof atualizarRotaDto>;