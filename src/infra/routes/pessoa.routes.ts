import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createPessoaSchema } from "../../domain/pessoa/dto/creat-pessoa-dto";
import { updatePessoaSchema } from "../../domain/pessoa/dto/update-pessoa-dto";
import { PessoaController } from "../controllers/pessoa.controller";


const PessoaRouter = Router();
const controlers = new PessoaController()

PessoaRouter.get("/",  (req, res) => controlers.getAllPessoa(req, res));
PessoaRouter.post("/criar", validate(createPessoaSchema), (req, res) => controlers.createPessoa(req, res));
PessoaRouter.patch("/update/:id", validate(updatePessoaSchema), (req, res) => controlers.updatePessoa(req, res));
PessoaRouter.delete("/delete/:id", (req, res) => controlers.deletePessoa(req, res));

export default PessoaRouter;