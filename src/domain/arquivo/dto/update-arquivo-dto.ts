import { z } from "zod";

export const updateArquivoSchema = z.object({
  nomeArquivo: z.string().min(3, "Nome muito curto").optional(),
  localArquivo: z.string().min(1, "Sem caminho do arquivo").optional(),
  arquivoAtivo: z.boolean().optional(),
  codRoteiro: z.int({message: "Deve ser um numero"}).optional()
});

export const atualizarArquivoDto = updateArquivoSchema.partial()
export type UpdateArquivoDTO = z.infer<typeof atualizarArquivoDto>;