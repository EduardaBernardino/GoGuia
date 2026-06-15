import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createPessoaSchema } from "../../domain/pessoa/dto/creat-pessoa-dto";
import { updatePessoaSchema } from "../../domain/pessoa/dto/update-pessoa-dto";
import { PessoaController } from "../controllers/pessoa.controller";
import { authMiddleware } from "../../core/middlewares/auth.middleware";


const PessoaRouter = Router();
const controlers = new PessoaController()

PessoaRouter.get("/", authMiddleware, (req, res) => controlers.getAllPessoa(req, res));
PessoaRouter.post("/criar", validate(createPessoaSchema), (req, res) => controlers.createPessoa(req, res));
PessoaRouter.patch("/update/:id", validate(updatePessoaSchema), (req, res) => controlers.updatePessoa(req, res));
PessoaRouter.delete("/delete/:id", authMiddleware, (req, res) => controlers.deletePessoa(req, res));

export default PessoaRouter;