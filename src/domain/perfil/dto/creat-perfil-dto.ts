import { z } from "zod";

export const createPerfilSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
});

export type CreatePerfilDTO = z.infer<typeof createPerfilSchema>;