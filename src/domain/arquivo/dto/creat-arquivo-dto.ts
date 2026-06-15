import { z } from "zod";

export const createArquivoSchema = z.object({
  arquivoAtivo: z.coerce.boolean().optional(),
  codRoteiro: z.coerce.number().int(),
});

export type CreateArquivoDTO = z.infer<typeof createArquivoSchema>;