import express from "express";
import { authMiddleware } from "./core/middlewares/auth.middleware";
import ArquivoRouter from "./infra/routes/arquivo.routes";
import AutenticacaoRoute from "./infra/routes/login.routes";
import OSRMRouter from "./infra/routes/OSRMRouter.routes";
import PagamentoRouter from "./infra/routes/pagamento.routes";
import PerfilRouter from "./infra/routes/perfil.routes";
import PessoaRouter from "./infra/routes/pessoa.routes";
import PontoRotaRouter from "./infra/routes/ponto-rota.routes";
import ReservaRouter from "./infra/routes/reserva.routes";
import RotaRouter from "./infra/routes/rota.routes";
import RoteiroRouter from "./infra/routes/roteiro.routes";
import StatusPagamentoRouter from "./infra/routes/status-pagamento.routes";
import StatusReservaRouter from "./infra/routes/status-reserva.routes";
import StatusRoteiroRouter from "./infra/routes/status-roteiro.routes";
import TipoPagamentoRouter from "./infra/routes/tipo-pagamento-roteiro.routes";
import FavoritoRouter from "./infra/routes/favorito.routes";


const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});


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
app.use("/favorito", authMiddleware, FavoritoRouter);
app.use("/arquivo", authMiddleware, ArquivoRouter);
app.use("/autenticacao", AutenticacaoRoute);
app.use("/osrm", OSRMRouter);


export default app;