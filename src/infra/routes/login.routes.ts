import { Router } from "express";
import jwt from "jsonwebtoken";
import { validate } from "../../core/middlewares/validate";
import { createLoginSchema } from "../../domain/autenticacao/dto/creat-login-dto";
import { PessoaRepository } from "../repository/pessoa-repository";
import { PessoaPresenter } from "../presenters/pessoa-present";

const AutenticacaoRoute = Router();

AutenticacaoRoute.post("/login", validate(createLoginSchema), async (req, res) => {
    const { email, senha } = req.body;
    const pessoa = new PessoaRepository


    const usuario = await pessoa.findLogin(email, senha)

    if (!usuario) {
        return res.status(401).json({
            message: "Credenciais inválidas",
        });
    }
    

    const token = jwt.sign(
        { id: usuario?.data.id, email: usuario?.data.email, }, process.env.JWT_SECRET as string,
        { expiresIn: "12h", }
    );

    return res.json(PessoaPresenter.resposePresenter(usuario, token));
});

export default AutenticacaoRoute;