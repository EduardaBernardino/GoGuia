import express from "express";
import PagamentoRouter from "./infra/routes/pagamento.routes";
import PerfilRouter from "./infra/routes/perfil.routes";
import StatusRoteiroRouter from "./infra/routes/status-roteiro.routes";
import StatusReservaRouter from "./infra/routes/status-reserva.routes";
import StatusPagamentoRouter from "./infra/routes/status-pagamento.routes";
import TipoPagamentoRouter from "./infra/routes/tipo-pagamento-roteiro.routes";
import PessoaRouter from "./infra/routes/pessoa.routes";
import RotaRouter from "./infra/routes/rota.routes";
import PontoRotaRouter from "./infra/routes/ponto-rota.routes";
import RoteiroRouter from "./infra/routes/roteiro.routes";
import ReservaRouter from "./infra/routes/reserva.routes";
import { authMiddleware } from "./core/middlewares/auth.middleware";
import AutenticacaoRoute from "./infra/routes/login.routes";
import ArquivoRouter from "./infra/routes/arquivo.routes";


const app = express();
app.use(express.json());

app.use("/pagamento", authMiddleware, PagamentoRouter);
app.use("/pessoa", PessoaRouter);
app.use("/rota", authMiddleware, RotaRouter);
app.use("/roteiro", authMiddleware, RoteiroRouter);
app.use("/reserva", authMiddleware, ReservaRouter);
app.use("/perfil", authMiddleware, PerfilRouter);
app.use("/status-roteiro", authMiddleware, StatusRoteiroRouter);
app.use("/status-reserva", authMiddleware, StatusReservaRouter);
app.use("/status-pagamento", authMiddleware, StatusPagamentoRouter);
app.use("/tipo-pagamento", authMiddleware, TipoPagamentoRouter);
app.use("/ponto-rota", authMiddleware, PontoRotaRouter);
app.use("/arquivo", authMiddleware, ArquivoRouter);
app.use("/autenticacao", AutenticacaoRoute);


export default app;