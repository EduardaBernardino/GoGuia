import { z } from "zod";

export const createRoteiroSchema = z.object({
  titulo: z.string().min(3, "Titulo muito curto"),
  descricao: z.string().min(3, "Descrição muito curto"),
  local: z.string().min(2, "Nome local muito curto"),
  preco: z.number("O preco deve ser um number").int(),
  desconto: z.number("O desconto deve ser um number").int().optional(),
  codStatusRoteiro: z.number("O desconto deve ser um number").int(),
  codGuia: z.number("O codGuia deve ser um number").int(),
  codRota: z.number("O codRota deve ser um number").int(),
});

export type CreateRoteiroDTO = z.infer<typeof createRoteiroSchema>;