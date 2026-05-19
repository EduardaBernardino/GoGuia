import { Request, Response } from "express";
import { CidadeRepository } from "../repository/cidade-repository";
import { CidadePresenter } from "../presenters/cidade-present";
import { CreateCidadeDTO } from "../../domain/cidade/dto/creat-cidade-dto";
import { Cidade } from "../../domain/cidade/type/cidade-interface";
import { UpdateCidadeDTO } from "../../domain/cidade/dto/update-cidade-dto";


export class CidadeController {

  private readonly cidadeRepository = new CidadeRepository

  async getAllCidade(req: Request, res: Response) {
    const cidades = await this.cidadeRepository.findAll()

    if (!cidades) {
      return res.status(404).json({
        message: "Não foi achar cidade"
      });
    }

    res.status(201).json(CidadePresenter.listaResposePresenter(cidades));
  };

  async createCidade(
    req: Request<{}, {}, CreateCidadeDTO>,
    res: Response
  ) {
    const cidadeNew = Cidade.create(req.body)
    const cidade = await this.cidadeRepository.create(cidadeNew)

    if (!cidade) {
      return res.status(500).json({
        message: "Não foi possível criar a cidade"
      });
    }

    res.status(201).json(CidadePresenter.resposePresenter(cidade));
  };

  async updateCidade(req: Request, res: Response) {

    const cidade = await this.cidadeRepository.update(
      Number(req.params.id),
      req.body as UpdateCidadeDTO
    );

    if (!cidade) {
      return res.status(500).json({
        message: "Não foi possível atualizar a cidade"
      });
    }

    res.status(201).json(CidadePresenter.resposePresenter(cidade));
  };

  async deleteCidade(req: Request, res: Response) {

    const cidade = await this.cidadeRepository.delete(Number(req.params.id));
    
    if (!cidade) {
      return res.status(500).json({
        message: "Não foi possível excluir a cidade"
      });
    }

    res.status(201).json({message:`Cidade ${cidade} removida`});
  };
}

