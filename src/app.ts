import express from "express";
import CidadeRouter from "./infra/routes/cidade.routes";
import PerfilRouter from "./infra/routes/perfil.routes";


const app = express();

app.use(express.json());

app.use("/cidade", CidadeRouter);
app.use("/perfil", PerfilRouter);


export default app;