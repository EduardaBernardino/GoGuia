import { z } from "zod";

export const updateStatusRoteiroSchema = z.object({
  nome: z.string().min(3, "Nome muito curto").optional(),
});

export const atualizarStatusRoteiroDto = updateStatusRoteiroSchema.partial()
export type UpdateStatusRoteiroDTO = z.infer<typeof atualizarStatusRoteiroDto>;