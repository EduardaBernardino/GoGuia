import { Request, Response } from "express";
import { PontoRotaRepository } from "../repository/ponto-rota-repository";
import { PontoRotaPresenter } from "../presenters/ponto-rota-present";
import { CreatePontoRotaDTO } from "../../domain/ponto rota/dto/creat-ponto-rota-dto";
import { PontoRota } from "../../domain/ponto rota/type/ponto-rota-interface";
import { UpdatePontoRotaDTO } from "../../domain/ponto rota/dto/update-ponto-rota-dto";



export class PontoRotaController {

  private readonly pontoRotaRepository = new PontoRotaRepository

  async getAllPontoRota(req: Request, res: Response) {
    const pontoRotas = await this.pontoRotaRepository.findAll()

    if (!pontoRotas) {
      return res.status(404).json({
        message: "Não foi achar pontoRota"
      });
    }

    res.status(201).json(PontoRotaPresenter.listaResposePresenter(pontoRotas));
  };

  async createPontoRota(
    req: Request<{}, {}, CreatePontoRotaDTO>,
    res: Response
  ) {
    const pontoRotaNew = PontoRota.create(req.body)
    const pontoRota = await this.pontoRotaRepository.create(pontoRotaNew)

    if (!pontoRota) {
      return res.status(500).json({
        message: "Não foi possível criar a pontoRota"
      });
    }

    res.status(201).json(PontoRotaPresenter.resposePresenter(pontoRota));
  };

  async updatePontoRota(req: Request, res: Response) {

    const pontoRota = await this.pontoRotaRepository.update(
      Number(req.params.id),
      req.body as UpdatePontoRotaDTO
    );

    if (!pontoRota) {
      return res.status(500).json({
        message: "Não foi possível atualizar a pontoRota"
      });
    }

    res.status(201).json(PontoRotaPresenter.resposePresenter(pontoRota));
  };

  async deletePontoRota(req: Request, res: Response) {

    const pontoRota = await this.pontoRotaRepository.delete(Number(req.params.id));
    
    if (!pontoRota) {
      return res.status(500).json({
        message: "Não foi possível excluir o ponto rota"
      });
    }

    res.status(201).json({message:`PontoRota ${pontoRota} removida`});
  };
}

