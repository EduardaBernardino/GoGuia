import { z } from "zod";

export const updatePerfilSchema = z.object({
  nome: z.string().min(3, "Nome muito curto").optional(),
});

export const atualizarPerfilDto = updatePerfilSchema.partial()
export type UpdatePerfilDTO = z.infer<typeof atualizarPerfilDto>;