import express from "express";
import CidadeRouter from "./infra/routes/cidade.routes";


const app = express();

app.use(express.json());

app.use("/cidade", CidadeRouter);


export default app;