import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate =
  (schema: z.ZodTypeAny) =>
    (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errors = Object.fromEntries(
          result.error.issues.map(issue => [
            issue.path[0],
            issue.message
          ])
        );

        return res.status(400).json(errors);
      }

      req.body = result.data;

      next();
    };