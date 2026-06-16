import { z } from "zod";

export const createFavoritoSchema = z.object({
  codRoteiro: z.number().int(),
  codPessoa: z.number().int()
});

export type CreateFavoritoDTO = z.infer<typeof createFavoritoSchema>;