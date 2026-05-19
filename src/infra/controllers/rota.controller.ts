import { Request, Response } from "express";
import { RotaRepository } from "../repository/rota-repository";
import { RotaPresenter } from "../presenters/rota-present";
import { CreateRotaDTO } from "../../domain/rota/dto/creat-rota-dto";
import { Rota } from "../../domain/rota/type/rota-interface";
import { UpdateRotaDTO } from "../../domain/rota/dto/update-rota-dto";


export class RotaController {

  private readonly rotaRepository = new RotaRepository

  async getAllRota(req: Request, res: Response) {
    const rotas = await this.rotaRepository.findAll()

    if (!rotas) {
      return res.status(404).json({
        message: "Não foi achar rota"
      });
    }

    res.status(201).json(RotaPresenter.listaResposePresenter(rotas));
  };

  async createRota(
    req: Request<{}, {}, CreateRotaDTO>,
    res: Response
  ) {
    const rotaNew = Rota.create(req.body)
    const rota = await this.rotaRepository.create(rotaNew)

    if (!rota) {
      return res.status(500).json({
        message: "Não foi possível criar a rota"
      });
    }

    res.status(201).json(RotaPresenter.resposePresenter(rota));
  };

  async updateRota(req: Request, res: Response) {

    const rota = await this.rotaRepository.update(
      Number(req.params.id),
      req.body as UpdateRotaDTO
    );

    if (!rota) {
      return res.status(500).json({
        message: "Não foi possível atualizar a rota"
      });
    }

    res.status(201).json(RotaPresenter.resposePresenter(rota));
  };

  async deleteRota(req: Request, res: Response) {

    const rota = await this.rotaRepository.delete(Number(req.params.id));
    
    if (!rota) {
      return res.status(500).json({
        message: "Não foi possível excluir a rota"
      });
    }

    res.status(201).json({message:`Rota ${rota} removida`});
  };
}

