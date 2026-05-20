import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { PontoRotaController } from "../controllers/ponto-rota.controller";
import { createPontoRotaSchema } from "../../domain/ponto rota/dto/creat-ponto-rota-dto";
import { updatePontoRotaSchema } from "../../domain/ponto rota/dto/update-ponto-rota-dto";



const PontoRotaRouter = Router();
const controlers = new PontoRotaController()

PontoRotaRouter.get("/",  (req, res) => controlers.getAllPontoRota(req, res));
PontoRotaRouter.post("/criar", validate(createPontoRotaSchema), (req, res) => controlers.createPontoRota(req, res));
PontoRotaRouter.patch("/update/:id", validate(updatePontoRotaSchema), (req, res) => controlers.updatePontoRota(req, res));
PontoRotaRouter.delete("/delete/:id", (req, res) => controlers.deletePontoRota(req, res));

export default PontoRotaRouter;