import { z } from "zod";

export const createLoginSchema = z.object({
  email : z.string({message: "Deve ser uma string"}),
  senha : z.string({message: "Deve ser uma string"}),
});

export type CreateLoginDTO = z.infer<typeof createLoginSchema>;