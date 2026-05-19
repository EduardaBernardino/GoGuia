import { z } from "zod";

export const createPessoaSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.email({ message: "Endereço de e-mail inválido" }),
  numTelefone: z.string({ message: "Deve ser uma string" }),
  codPerfil: z.int({ message: "Deve ser um number" }),
});

export type CreatePessoaDTO = z.infer<typeof createPessoaSchema>;