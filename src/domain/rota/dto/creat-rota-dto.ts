import { z } from "zod";

export const createRotaSchema = z.object({
  tempo: z.string("Deve ser uma string"),
  distancia: z.int("Deve ser um inteiro")

});

export type CreateRotaDTO = z.infer<typeof createRotaSchema>;