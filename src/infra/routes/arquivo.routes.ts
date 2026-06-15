import { Router } from "express";
import { validate } from "../../core/middlewares/validate";
import { createArquivoSchema } from "../../domain/arquivo/dto/creat-arquivo-dto";
import { updateArquivoSchema } from "../../domain/arquivo/dto/update-arquivo-dto";
import { ArquivoController } from "../controllers/arquivo.controller";
import multer from "multer";


const ArquivoRouter = Router();
const controlers = new ArquivoController()
const upload = multer({ storage: multer.memoryStorage() });

ArquivoRouter.get("/", (req, res) => controlers.getAllArquivo(req, res));
ArquivoRouter.patch("/update/:id", validate(updateArquivoSchema), (req, res) => controlers.updateArquivo(req, res));
ArquivoRouter.delete("/delete/:id", (req, res) => controlers.deleteArquivo(req, res));

ArquivoRouter.post("/upload",  upload.single("image"), validate(createArquivoSchema), (req, res) => controlers.uploadArquivo(req, res));
ArquivoRouter.get("/buscar/:id", (req, res) => controlers.getImageArquivo(req, res));

export default ArquivoRouter;