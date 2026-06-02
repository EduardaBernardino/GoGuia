import { Request, Response } from "express";
import { StatusPagamentoRepository } from "../repository/status-pagamento-repository";
import { StatusPagamentoPresenter } from "../presenters/status-pagamento-present";

import { StatusPagamento } from "../../domain/Status Pagamento/type/status-pagamento-interface";
import { UpdateStatusPagamentoDTO } from "../../domain/Status Pagamento/dto/update-status-pagamento-dto";
import { CreateStatusPagamentoDTO } from "../../domain/Status Pagamento/dto/creat-status-roteiro-dto";



export class StatusPagamentoController {

  private readonly statusPagamentoRepository = new StatusPagamentoRepository

  async getAllStatusPagamento(req: Request, res: Response) {
    const statusPagamentos = await this.statusPagamentoRepository.findAll()

    if (!statusPagamentos) {
      return res.status(404).json({
        message: "Não foi achar statusPagamento"
      });
    }

    res.status(201).json(StatusPagamentoPresenter.listaResposePresenter(statusPagamentos));
  };

  async createStatusPagamento(
    req: Request<{}, {}, CreateStatusPagamentoDTO>,
    res: Response
  ) {
    const statusPagamentoNew = StatusPagamento.create(req.body)
    const statusPagamento = await this.statusPagamentoRepository.create(statusPagamentoNew)

    if (!statusPagamento) {
      return res.status(500).json({
        message: "Não foi possível criar a statusPagamento"
      });
    }

    res.status(201).json(StatusPagamentoPresenter.resposePresenter(statusPagamento));
  };

  async updateStatusPagamento(req: Request, res: Response) {

    const statusPagamento = await this.statusPagamentoRepository.update(
      Number(req.params.id),
      req.body as UpdateStatusPagamentoDTO
    );

    if (!statusPagamento) {
      return res.status(500).json({
        message: "Não foi possível atualizar a statusPagamento"
      });
    }

    res.status(201).json(StatusPagamentoPresenter.resposePresenter(statusPagamento));
  };

  async deleteStatusPagamento(req: Request, res: Response) {

    const statusPagamento = await this.statusPagamentoRepository.delete(Number(req.params.id));
    
    if (!statusPagamento) {
      return res.status(500).json({
        message: "Não foi possível excluir a statusPagamento"
      });
    }

    res.status(201).json({message:`StatusPagamento ${statusPagamento} removida`});
  };
}

