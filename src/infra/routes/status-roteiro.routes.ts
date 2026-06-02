import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createStatusRoteiroSchema } from "../../domain/Status Roteiro/dto/creat-status-roteiro-dto";
import { updateStatusRoteiroSchema } from "../../domain/Status Roteiro/dto/update-status-roteiro-dto";
import { StatusRoteiroController } from "../controllers/status-roteiro.controller";



const StatusRoteiroRouter = Router();
const controlers = new StatusRoteiroController()

StatusRoteiroRouter.get("/",  (req, res) => controlers.getAllStatusRoteiro(req, res));
StatusRoteiroRouter.post("/criar", validate(createStatusRoteiroSchema), (req, res) => controlers.createStatusRoteiro(req, res));
StatusRoteiroRouter.patch("/update/:id", validate(updateStatusRoteiroSchema), (req, res) => controlers.updateStatusRoteiro(req, res));
StatusRoteiroRouter.delete("/delete/:id", (req, res) => controlers.deleteStatusRoteiro(req, res));

export default StatusRoteiroRouter;