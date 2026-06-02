import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createRotaSchema } from "../../domain/rota/dto/creat-rota-dto";
import { updateRotaSchema } from "../../domain/rota/dto/update-rota-dto";
import { RotaController } from "../controllers/rota.controller";


const RotaRouter = Router();
const controlers = new RotaController()

RotaRouter.get("/",  (req, res) => controlers.getAllRota(req, res));
RotaRouter.post("/criar", validate(createRotaSchema), (req, res) => controlers.createRota(req, res));
RotaRouter.patch("/update/:id", validate(updateRotaSchema), (req, res) => controlers.updateRota(req, res));
RotaRouter.delete("/delete/:id", (req, res) => controlers.deleteRota(req, res));

export default RotaRouter;