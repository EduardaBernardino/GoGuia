import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createRoteiroSchema } from "../../domain/roteiro/dto/creat-roteiro-dto";
import { updateRoteiroSchema } from "../../domain/roteiro/dto/update-roteiro-dto";
import { RoteiroController } from "../controllers/roteiro.controller";


const RoteiroRouter = Router();
const controlers = new RoteiroController()

RoteiroRouter.get("/",  (req, res) => controlers.getAllRoteiro(req, res));
RoteiroRouter.get("/:id",  (req, res) => controlers.getByIdRoteiro(req, res));
RoteiroRouter.post("/criar", validate(createRoteiroSchema), (req, res) => controlers.createRoteiro(req, res));
RoteiroRouter.patch("/update/:id", validate(updateRoteiroSchema), (req, res) => controlers.updateRoteiro(req, res));
RoteiroRouter.delete("/delete/:id", (req, res) => controlers.deleteRoteiro(req, res));

export default RoteiroRouter;