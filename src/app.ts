import express from "express";
import CidadeRouter from "./infra/routes/cidade.routes";
import PerfilRouter from "./infra/routes/perfil.routes";
import StatusRoteiroRouter from "./infra/routes/status-roteiro.routes";
import StatusReservaRouter from "./infra/routes/status-reserva.routes";
import StatusPagamentoRouter from "./infra/routes/status-pagamento.routes";
import TipoPagamentoRouter from "./infra/routes/tipo-pagamento-roteiro.routes";
import PessoaRouter from "./infra/routes/pessoa.routes";
import RotaRouter from "./infra/routes/rota.routes";
import PontoRotaRouter from "./infra/routes/ponto-rota.routes";


const app = express();
app.use(express.json());

app.use("/cidade", CidadeRouter);
app.use("/pessoa", PessoaRouter);
app.use("/rota", RotaRouter);
app.use("/perfil", PerfilRouter);
app.use("/status-roteiro", StatusRoteiroRouter);
app.use("/status-reserva", StatusReservaRouter);
app.use("/status-pagamento", StatusPagamentoRouter);
app.use("/tipo-pagamento", TipoPagamentoRouter);
app.use("/ponto-rota", PontoRotaRouter);


export default app;