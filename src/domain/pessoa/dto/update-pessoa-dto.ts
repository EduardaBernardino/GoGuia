import { z } from "zod";

export const updatePessoaSchema = z.object({
  nome: z.string().min(3, "Nome muito curto").optional(),
  email: z.email({ message: "Endereço de e-mail inválido" }).optional(),
  numTelefone: z.string({ message: "Deve ser uma string" }).optional(),
  codPerfil: z.int({ message: "Deve ser um number" }).optional(),
});

export const atualizarPessoaDto = updatePessoaSchema.partial()
export type UpdatePessoaDTO = z.infer<typeof atualizarPessoaDto>;