import { z } from "zod";

export const updateReservaSchema = z.object({
  data: z.coerce.date("Data invalida").optional(),
  quantPessoas: z.number("A quantPessoas deve ser um number").int().optional(),
  codGuia: z.number("O codGuia deve ser um number").int().optional(),
  codStatusReserva: z.number("O codGuia deve ser um number").int().optional(),
  codTurista: z.number("O codGuia deve ser um number").int().optional(),
  codRoteiro: z.number("O codGuia deve ser um number").int().optional(),
});

export const atualizarReservaDto = updateReservaSchema.partial()
export type UpdateReservaDTO = z.infer<typeof atualizarReservaDto>;