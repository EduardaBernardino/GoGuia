import { Router } from "express";
import { CidadeController } from "../controllers/cidade.controller";
import { validate } from "../../core/middlewares/validate";
import { createCidadeSchema } from "../../domain/cidade/dto/creat-cidade-dto";
import { updateCidadeSchema } from "../../domain/cidade/dto/update-cidade-dto";


const CidadeRouter = Router();
const controlers = new CidadeController()

CidadeRouter.get("/",  (req, res) => controlers.getAllCidade(req, res));
CidadeRouter.post("/criar", validate(createCidadeSchema), (req, res) => controlers.createCidade(req, res));
CidadeRouter.patch("/update/:id", validate(updateCidadeSchema), (req, res) => controlers.updateCidade(req, res));
CidadeRouter.delete("/delete/:id", (req, res) => controlers.deleteCidade(req, res));

export default CidadeRouter;