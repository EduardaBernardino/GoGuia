import { z } from "zod";

export const updateStatusReservaSchema = z.object({
  nome: z.string().min(3, "Nome muito curto").optional(),
});

export const atualizarStatusReservaDto = updateStatusReservaSchema.partial()
export type UpdateStatusReservaDTO = z.infer<typeof atualizarStatusReservaDto>;