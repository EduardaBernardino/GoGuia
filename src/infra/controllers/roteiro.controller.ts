import { Request, Response } from "express";
import { RoteiroRepository } from "../repository/roteiro-repository";
import { RoteiroPresenter } from "../presenters/roteiro-present";
import { CreateRoteiroDTO } from "../../domain/roteiro/dto/creat-roteiro-dto";
import { Roteiro } from "../../domain/roteiro/type/roteiro-interface";
import { UpdateRoteiroDTO } from "../../domain/roteiro/dto/update-roteiro-dto";


export class RoteiroController {

  private readonly roteiroRepository = new RoteiroRepository

  async getAllRoteiro(req: Request, res: Response) {
    const roteiros = await this.roteiroRepository.findAll()

    if (!roteiros) {
      return res.status(404).json({
        message: "Não foi achar roteiro"
      });
    }

    res.status(201).json(RoteiroPresenter.listaResposePresenter(roteiros));
  };

  async getByIdRoteiro(req: Request, res: Response) {
    const roteiro = await this.roteiroRepository.findById(Number(req.params.id))

    if (!roteiro) {
      return res.status(404).json({
        message: "Não foi achar roteiro"
      });
    }

    res.status(201).json(RoteiroPresenter.resposePresenter(roteiro));
  };

  async createRoteiro(
    req: Request<{}, {}, CreateRoteiroDTO>,
    res: Response
  ) {
    const roteiroNew = Roteiro.create(req.body)
    const roteiro = await this.roteiroRepository.create(roteiroNew)

    if (!roteiro) {
      return res.status(500).json({
        message: "Não foi possível criar a roteiro"
      });
    }

    res.status(201).json(RoteiroPresenter.resposePresenter(roteiro));
  };

  async updateRoteiro(req: Request, res: Response) {

    const roteiro = await this.roteiroRepository.update(
      Number(req.params.id),
      req.body as UpdateRoteiroDTO
    );

    if (!roteiro) {
      return res.status(500).json({
        message: "Não foi possível atualizar a roteiro"
      });
    }

    res.status(201).json(RoteiroPresenter.resposePresenter(roteiro));
  };

  async deleteRoteiro(req: Request, res: Response) {

    const roteiro = await this.roteiroRepository.delete(Number(req.params.id));
    
    if (!roteiro) {
      return res.status(500).json({
        message: "Não foi possível excluir a roteiro"
      });
    }

    res.status(201).json({message:`Roteiro ${roteiro} removida`});
  };
}

