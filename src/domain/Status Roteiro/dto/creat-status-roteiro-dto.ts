import { z } from "zod";

export const createStatusRoteiroSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
});

export type CreateStatusRoteiroDTO = z.infer<typeof createStatusRoteiroSchema>;