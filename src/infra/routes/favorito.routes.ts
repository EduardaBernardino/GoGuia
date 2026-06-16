import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createFavoritoSchema } from "../../domain/favorito/dto/creat-favorito-dto";
import { updateFavoritoSchema } from "../../domain/favorito/dto/update-favorito-dto";
import { FavoritoController } from "../controllers/favorito.controller";


const FavoritoRouter = Router();
const controlers = new FavoritoController()

FavoritoRouter.get("/",  (req, res) => controlers.getAllFavorito(req, res));
FavoritoRouter.post("/criar", validate(createFavoritoSchema), (req, res) => controlers.createFavorito(req, res));
FavoritoRouter.patch("/update/:id", validate(updateFavoritoSchema), (req, res) => controlers.updateFavorito(req, res));
FavoritoRouter.delete("/delete/:id", (req, res) => controlers.deleteFavorito(req, res));

export default FavoritoRouter;