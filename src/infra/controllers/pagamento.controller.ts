import { Request, Response } from "express";
import { CreatePagamentoDTO } from "../../domain/pagamento/dto/creat-pagamento-dto";
import { Pagamento } from "../../domain/pagamento/type/pagamento-interface";
import { UpdatePagamentoDTO } from "../../domain/pagamento/dto/update-pagamento-dto";
import { PagamentoRepository } from "../repository/pagamento-repository";
import { PagamentoPresenter } from "../presenters/pagamento-present";


export class PagamentoController {

  private readonly pagamentoRepository = new PagamentoRepository

  async getAllPagamento(req: Request, res: Response) {
    const pagamentos = await this.pagamentoRepository.findAll()

    if (!pagamentos) {
      return res.status(404).json({
        message: "Não foi achar pagamento"
      });
    }

    res.status(201).json(PagamentoPresenter.listaResposePresenter(pagamentos));
  };

  async createPagamento(
    req: Request<{}, {}, CreatePagamentoDTO>,
    res: Response
  ) {
    const pagamentoNew = Pagamento.create(req.body)
    const pagamento = await this.pagamentoRepository.create(pagamentoNew)

    if (!pagamento) {
      return res.status(500).json({
        message: "Não foi possível criar a pagamento"
      });
    }

    res.status(201).json(PagamentoPresenter.resposePresenter(pagamento));
  };

  async updatePagamento(req: Request, res: Response) {

    const pagamento = await this.pagamentoRepository.update(
      Number(req.params.id),
      req.body as UpdatePagamentoDTO
    );

    if (!pagamento) {
      return res.status(500).json({
        message: "Não foi possível atualizar a pagamento"
      });
    }

    res.status(201).json(PagamentoPresenter.resposePresenter(pagamento));
  };

  async deletePagamento(req: Request, res: Response) {

    const pagamento = await this.pagamentoRepository.delete(Number(req.params.id));

    if (!pagamento) {
      return res.status(500).json({
        message: "Não foi possível excluir a pagamento"
      });
    }

    res.status(201).json({ message: `Pagamento ${pagamento} removida` });
  };
}

