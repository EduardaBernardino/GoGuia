import { Request, Response } from "express";
import { StatusRoteiroRepository } from "../repository/status-roteiro-repository";
import { StatusRoteiroPresenter } from "../presenters/status-roteiro-present";
import { CreateStatusRoteiroDTO } from "../../domain/Status Roteiro/dto/creat-status-roteiro-dto";
import { StatusRoteiro } from "../../domain/Status Roteiro/type/status-roteiro-interface";
import { UpdateStatusRoteiroDTO } from "../../domain/Status Roteiro/dto/update-status-roteiro-dto";



export class StatusRoteiroController {

  private readonly statusRoteiroRepository = new StatusRoteiroRepository

  async getAllStatusRoteiro(req: Request, res: Response) {
    const statusRoteiros = await this.statusRoteiroRepository.findAll()

    if (!statusRoteiros) {
      return res.status(404).json({
        message: "Não foi achar statusRoteiro"
      });
    }

    res.status(201).json(StatusRoteiroPresenter.listaResposePresenter(statusRoteiros));
  };

  async createStatusRoteiro(
    req: Request<{}, {}, CreateStatusRoteiroDTO>,
    res: Response
  ) {
    const statusRoteiroNew = StatusRoteiro.create(req.body)
    const statusRoteiro = await this.statusRoteiroRepository.create(statusRoteiroNew)

    if (!statusRoteiro) {
      return res.status(500).json({
        message: "Não foi possível criar a statusRoteiro"
      });
    }

    res.status(201).json(StatusRoteiroPresenter.resposePresenter(statusRoteiro));
  };

  async updateStatusRoteiro(req: Request, res: Response) {

    const statusRoteiro = await this.statusRoteiroRepository.update(
      Number(req.params.id),
      req.body as UpdateStatusRoteiroDTO
    );

    if (!statusRoteiro) {
      return res.status(500).json({
        message: "Não foi possível atualizar a statusRoteiro"
      });
    }

    res.status(201).json(StatusRoteiroPresenter.resposePresenter(statusRoteiro));
  };

  async deleteStatusRoteiro(req: Request, res: Response) {

    const statusRoteiro = await this.statusRoteiroRepository.delete(Number(req.params.id));
    
    if (!statusRoteiro) {
      return res.status(500).json({
        message: "Não foi possível excluir a statusRoteiro"
      });
    }

    res.status(201).json({message:`StatusRoteiro ${statusRoteiro} removida`});
  };
}

