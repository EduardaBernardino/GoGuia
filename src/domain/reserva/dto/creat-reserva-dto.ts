import { z } from "zod";

export const createReservaSchema = z.object({
  data: z.coerce.date("Data invalida"),
  quantPessoas: z.number("A quantPessoas deve ser um number").int(),
  codGuia: z.number("O codGuia deve ser um number").int(),
  codStatusReserva: z.number("O codGuia deve ser um number").int(),
  codTurista: z.number("O codGuia deve ser um number").int(),
  codRoteiro: z.number("O codGuia deve ser um number").int(),
});

export type CreateReservaDTO = z.infer<typeof createReservaSchema>;