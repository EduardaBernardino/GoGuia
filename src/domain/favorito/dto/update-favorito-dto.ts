import { z } from "zod";

export const updateFavoritoSchema = z.object({
  codRoteiro: z.number().int().optional(),
  codPessoa: z.number().int().optional()
});

export const atualizarFavoritoDto = updateFavoritoSchema.partial()
export type UpdateFavoritoDTO = z.infer<typeof atualizarFavoritoDto>;