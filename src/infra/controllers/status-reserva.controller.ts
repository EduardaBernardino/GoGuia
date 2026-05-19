import { Request, Response } from "express";
import { StatusReservaRepository } from "../repository/status-reserva-repository";
import { StatusReservaPresenter } from "../presenters/status-reserva-present";
import { CreateStatusReservaDTO } from "../../domain/Status Reserva/dto/creat-status-reserva-dto";
import { StatusReserva } from "../../domain/Status Reserva/type/status-reserva-interface";
import { UpdateStatusReservaDTO } from "../../domain/Status Reserva/dto/update-status-reserva-dto";



export class StatusReservaController {

  private readonly statusReservaRepository = new StatusReservaRepository

  async getAllStatusReserva(req: Request, res: Response) {
    const statusReservas = await this.statusReservaRepository.findAll()

    if (!statusReservas) {
      return res.status(404).json({
        message: "Não foi achar statusReserva"
      });
    }

    res.status(201).json(StatusReservaPresenter.listaResposePresenter(statusReservas));
  };

  async createStatusReserva(
    req: Request<{}, {}, CreateStatusReservaDTO>,
    res: Response
  ) {
    const statusReservaNew = StatusReserva.create(req.body)
    const statusReserva = await this.statusReservaRepository.create(statusReservaNew)

    if (!statusReserva) {
      return res.status(500).json({
        message: "Não foi possível criar a statusReserva"
      });
    }

    res.status(201).json(StatusReservaPresenter.resposePresenter(statusReserva));
  };

  async updateStatusReserva(req: Request, res: Response) {

    const statusReserva = await this.statusReservaRepository.update(
      Number(req.params.id),
      req.body as UpdateStatusReservaDTO
    );

    if (!statusReserva) {
      return res.status(500).json({
        message: "Não foi possível atualizar a statusReserva"
      });
    }

    res.status(201).json(StatusReservaPresenter.resposePresenter(statusReserva));
  };

  async deleteStatusReserva(req: Request, res: Response) {

    const statusReserva = await this.statusReservaRepository.delete(Number(req.params.id));
    
    if (!statusReserva) {
      return res.status(500).json({
        message: "Não foi possível excluir a statusReserva"
      });
    }

    res.status(201).json({message:`StatusReserva ${statusReserva} removida`});
  };
}

