import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createReservaSchema } from "../../domain/reserva/dto/creat-reserva-dto";
import { updateReservaSchema } from "../../domain/reserva/dto/update-reserva-dto";
import { ReservaController } from "../controllers/reserva.controller";


const ReservaRouter = Router();
const controlers = new ReservaController()

ReservaRouter.get("/",  (req, res) => controlers.getAllReserva(req, res));
ReservaRouter.post("/criar", validate(createReservaSchema), (req, res) => controlers.createReserva(req, res));
ReservaRouter.patch("/update/:id", validate(updateReservaSchema), (req, res) => controlers.updateReserva(req, res));
ReservaRouter.delete("/delete/:id", (req, res) => controlers.deleteReserva(req, res));

export default ReservaRouter;