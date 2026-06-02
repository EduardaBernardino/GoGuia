import { z } from "zod";

export const updateRoteiroSchema = z.object({
  titulo: z.string().min(3, "Titulo muito curto").optional(),
  descricao: z.string().min(3, "Descrição muito curto").optional(),
  local: z.string().min(2, "Nome local muito curto").optional(),
  preco: z.number("O preco deve ser um number").int().optional(),
  desconto: z.number("O desconto deve ser um number").int().optional(),
  codStatusRoteiro: z.number("O desconto deve ser um number").int().optional(),
  codGuia: z.number("O codGuia deve ser um number").int().optional(),
  codRota: z.number("O codRota deve ser um number").int().optional(),
});

export const atualizarRoteiroDto = updateRoteiroSchema.partial()
export type UpdateRoteiroDTO = z.infer<typeof atualizarRoteiroDto>;