import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { TipoPagamentoController } from "../controllers/tipo-pagamento.controller";
import { createTipoPagamentoSchema } from "../../domain/Tipo Pagamento/dto/creat-tipo-pagamento-dto";
import { updateTipoPagamentoSchema } from "../../domain/Tipo Pagamento/dto/update-tipo-pagamento-dto";



const TipoPagamentoRouter = Router();
const controlers = new TipoPagamentoController()

TipoPagamentoRouter.get("/",  (req, res) => controlers.getAllTipoPagamento(req, res));
TipoPagamentoRouter.post("/criar", validate(createTipoPagamentoSchema), (req, res) => controlers.createTipoPagamento(req, res));
TipoPagamentoRouter.patch("/update/:id", validate(updateTipoPagamentoSchema), (req, res) => controlers.updateTipoPagamento(req, res));
TipoPagamentoRouter.delete("/delete/:id", (req, res) => controlers.deleteTipoPagamento(req, res));

export default TipoPagamentoRouter;