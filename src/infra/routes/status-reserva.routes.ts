import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createStatusReservaSchema } from "../../domain/Status Reserva/dto/creat-status-reserva-dto";
import { updateStatusReservaSchema } from "../../domain/Status Reserva/dto/update-status-reserva-dto";
import { StatusReservaController } from "../controllers/status-reserva.controller";




const StatusReservaRouter = Router();
const controlers = new StatusReservaController()

StatusReservaRouter.get("/",  (req, res) => controlers.getAllStatusReserva(req, res));
StatusReservaRouter.post("/criar", validate(createStatusReservaSchema), (req, res) => controlers.createStatusReserva(req, res));
StatusReservaRouter.patch("/update/:id", validate(updateStatusReservaSchema), (req, res) => controlers.updateStatusReserva(req, res));
StatusReservaRouter.delete("/delete/:id", (req, res) => controlers.deleteStatusReserva(req, res));

export default StatusReservaRouter;