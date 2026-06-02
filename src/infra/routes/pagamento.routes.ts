import { Router } from "express";
import { PagamentoController } from "../controllers/pagamento.controller";
import { validate } from "../../core/middlewares/validate";
import { createPagamentoSchema } from "../../domain/pagamento/dto/creat-pagamento-dto";
import { updatePagamentoSchema } from "../../domain/pagamento/dto/update-pagamento-dto";


const PagamentoRouter = Router();
const controlers = new PagamentoController()

PagamentoRouter.get("/", (req, res) => controlers.getAllPagamento(req, res));
PagamentoRouter.post("/criar", validate(createPagamentoSchema), (req, res) => controlers.createPagamento(req, res));
PagamentoRouter.patch("/update/:id", validate(updatePagamentoSchema), (req, res) => controlers.updatePagamento(req, res));
PagamentoRouter.delete("/delete/:id", (req, res) => controlers.deletePagamento(req, res));

export default PagamentoRouter;