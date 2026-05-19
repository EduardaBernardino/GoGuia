import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { updateStatusPagamentoSchema } from "../../domain/Status Pagamento/dto/update-status-pagamento-dto";
import { StatusPagamentoController } from "../controllers/status-pagamento.controller";
import { createStatusPagamentoSchema } from "../../domain/Status Pagamento/dto/creat-status-roteiro-dto";




const StatusPagamentoRouter = Router();
const controlers = new StatusPagamentoController()

StatusPagamentoRouter.get("/",  (req, res) => controlers.getAllStatusPagamento(req, res));
StatusPagamentoRouter.post("/criar", validate(createStatusPagamentoSchema), (req, res) => controlers.createStatusPagamento(req, res));
StatusPagamentoRouter.patch("/update/:id", validate(updateStatusPagamentoSchema), (req, res) => controlers.updateStatusPagamento(req, res));
StatusPagamentoRouter.delete("/delete/:id", (req, res) => controlers.deleteStatusPagamento(req, res));

export default StatusPagamentoRouter;