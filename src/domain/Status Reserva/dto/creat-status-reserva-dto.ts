import { z } from "zod";

export const createStatusReservaSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
});

export type CreateStatusReservaDTO = z.infer<typeof createStatusReservaSchema>;