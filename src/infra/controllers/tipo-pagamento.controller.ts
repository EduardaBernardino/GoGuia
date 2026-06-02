import { Request, Response } from "express";
import { TipoPagamentoRepository } from "../repository/tipo-pagamento-repository";
import { TipoPagamentoPresenter } from "../presenters/tipo-pagamento-present";
import { CreateTipoPagamentoDTO } from "../../domain/Tipo Pagamento/dto/creat-tipo-pagamento-dto";
import { TipoPagamento } from "../../domain/Tipo Pagamento/type/tipo-pagamento-interface";
import { UpdateTipoPagamentoDTO } from "../../domain/Tipo Pagamento/dto/update-tipo-pagamento-dto";




export class TipoPagamentoController {

  private readonly tipoPagamentoRepository = new TipoPagamentoRepository

  async getAllTipoPagamento(req: Request, res: Response) {
    const tipoPagamentos = await this.tipoPagamentoRepository.findAll()

    if (!tipoPagamentos) {
      return res.status(404).json({
        message: "Não foi achar tipoPagamento"
      });
    }

    res.status(201).json(TipoPagamentoPresenter.listaResposePresenter(tipoPagamentos));
  };

  async createTipoPagamento(
    req: Request<{}, {}, CreateTipoPagamentoDTO>,
    res: Response
  ) {
    const tipoPagamentoNew = TipoPagamento.create(req.body)
    const tipoPagamento = await this.tipoPagamentoRepository.create(tipoPagamentoNew)

    if (!tipoPagamento) {
      return res.status(500).json({
        message: "Não foi possível criar a tipoPagamento"
      });
    }

    res.status(201).json(TipoPagamentoPresenter.resposePresenter(tipoPagamento));
  };

  async updateTipoPagamento(req: Request, res: Response) {

    const tipoPagamento = await this.tipoPagamentoRepository.update(
      Number(req.params.id),
      req.body as UpdateTipoPagamentoDTO
    );

    if (!tipoPagamento) {
      return res.status(500).json({
        message: "Não foi possível atualizar a tipoPagamento"
      });
    }

    res.status(201).json(TipoPagamentoPresenter.resposePresenter(tipoPagamento));
  };

  async deleteTipoPagamento(req: Request, res: Response) {

    const tipoPagamento = await this.tipoPagamentoRepository.delete(Number(req.params.id));
    
    if (!tipoPagamento) {
      return res.status(500).json({
        message: "Não foi possível excluir a tipoPagamento"
      });
    }

    res.status(201).json({message:`TipoPagamento ${tipoPagamento} removida`});
  };
}

