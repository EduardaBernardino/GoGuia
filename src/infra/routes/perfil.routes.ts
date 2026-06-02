import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createPerfilSchema } from "../../domain/perfil/dto/creat-perfil-dto";
import { updatePerfilSchema } from "../../domain/perfil/dto/update-perfil-dto";
import { PerfilController } from "../controllers/perfil.controller";


const PerfilRouter = Router();
const controlers = new PerfilController()

PerfilRouter.get("/",  (req, res) => controlers.getAllPerfil(req, res));
PerfilRouter.post("/criar", validate(createPerfilSchema), (req, res) => controlers.createPerfil(req, res));
PerfilRouter.patch("/update/:id", validate(updatePerfilSchema), (req, res) => controlers.updatePerfil(req, res));
PerfilRouter.delete("/delete/:id", (req, res) => controlers.deletePerfil(req, res));

export default PerfilRouter;