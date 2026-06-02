import { Request, Response } from "express";
import { ReservaRepository } from "../repository/reserva-repository";
import { ReservaPresenter } from "../presenters/reserva-present";
import { CreateReservaDTO } from "../../domain/reserva/dto/creat-reserva-dto";
import { Reserva } from "../../domain/reserva/type/reserva-interface";
import { UpdateReservaDTO } from "../../domain/reserva/dto/update-reserva-dto";


export class ReservaController {

  private readonly reservaRepository = new ReservaRepository

  async getAllReserva(req: Request, res: Response) {
    const reservas = await this.reservaRepository.findAll()

    if (!reservas) {
      return res.status(404).json({
        message: "Não foi achar reserva"
      });
    }

    res.status(201).json(ReservaPresenter.listaResposePresenter(reservas));
  };

  async createReserva(
    req: Request<{}, {}, CreateReservaDTO>,
    res: Response
  ) {
    const reservaNew = Reserva.create(req.body)
    const reserva = await this.reservaRepository.create(reservaNew)

    if (!reserva) {
      return res.status(500).json({
        message: "Não foi possível criar a reserva"
      });
    }

    res.status(201).json(ReservaPresenter.resposePresenter(reserva));
  };

  async updateReserva(req: Request, res: Response) {

    const reserva = await this.reservaRepository.update(
      Number(req.params.id),
      req.body as UpdateReservaDTO
    );

    if (!reserva) {
      return res.status(500).json({
        message: "Não foi possível atualizar a reserva"
      });
    }

    res.status(201).json(ReservaPresenter.resposePresenter(reserva));
  };

  async deleteReserva(req: Request, res: Response) {

    const reserva = await this.reservaRepository.delete(Number(req.params.id));
    
    if (!reserva) {
      return res.status(500).json({
        message: "Não foi possível excluir a reserva"
      });
    }

    res.status(201).json({message:`Reserva ${reserva} removida`});
  };
}

