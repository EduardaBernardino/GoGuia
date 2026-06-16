import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createRoteiroSchema } from "../../domain/roteiro/dto/creat-roteiro-dto";
import { updateRoteiroSchema } from "../../domain/roteiro/dto/update-roteiro-dto";
import { RoteiroController } from "../controllers/roteiro.controller";
import { OsrmController } from "../controllers/osrm.controller";


const OSRMRouter = Router();
const controlers = new OsrmController()

OSRMRouter.get("/route",  (req, res) => controlers.getMapa(req, res));


export default OSRMRouter;