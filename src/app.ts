import express from "express";
import CidadeRouter from "./infra/routes/cidade.routes";
import PerfilRouter from "./infra/routes/perfil.routes";
import StatusRoteiroRouter from "./infra/routes/status-roteiro.routes";
import StatusReservaRouter from "./infra/routes/status-reserva.routes";
import StatusPagamentoRouter from "./infra/routes/status-pagamento.routes";


const app = express();
app.use(express.json());

app.use("/cidade", CidadeRouter);
app.use("/perfil", PerfilRouter);
app.use("/status-roteiro", StatusRoteiroRouter);
app.use("/status-reserva", StatusReservaRouter);
app.use("/status-pagamento", StatusPagamentoRouter);


export default app;