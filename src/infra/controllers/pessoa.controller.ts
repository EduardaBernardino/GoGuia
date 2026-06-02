import { Request, Response } from "express";
import { PessoaRepository } from "../repository/pessoa-repository";
import { PessoaPresenter } from "../presenters/pessoa-present";
import { CreatePessoaDTO } from "../../domain/pessoa/dto/creat-pessoa-dto";
import { Pessoa } from "../../domain/pessoa/type/pessoa-interface";
import { UpdatePessoaDTO } from "../../domain/pessoa/dto/update-pessoa-dto";


export class PessoaController {

  private readonly pessoaRepository = new PessoaRepository

  async getAllPessoa(req: Request, res: Response) {
    const pessoas = await this.pessoaRepository.findAll()

    if (!pessoas) {
      return res.status(404).json({
        message: "Não foi achar pessoa"
      });
    }

    res.status(201).json(PessoaPresenter.listaResposePresenter(pessoas));
  };

  async createPessoa(
    req: Request<{}, {}, CreatePessoaDTO>,
    res: Response
  ) {
    const pessoaNew = Pessoa.create(req.body)
    const pessoa = await this.pessoaRepository.create(pessoaNew)

    if (!pessoa) {
      return res.status(500).json({
        message: "Não foi possível criar a pessoa"
      });
    }

    res.status(201).json(PessoaPresenter.resposePresenter(pessoa));
  };

  async updatePessoa(req: Request, res: Response) {

    const pessoa = await this.pessoaRepository.update(
      Number(req.params.id),
      req.body as UpdatePessoaDTO
    );

    if (!pessoa) {
      return res.status(500).json({
        message: "Não foi possível atualizar a pessoa"
      });
    }

    res.status(201).json(PessoaPresenter.resposePresenter(pessoa));
  };

  async deletePessoa(req: Request, res: Response) {

    const pessoa = await this.pessoaRepository.delete(Number(req.params.id));
    
    if (!pessoa) {
      return res.status(500).json({
        message: "Não foi possível excluir a pessoa"
      });
    }

    res.status(201).json({message:`Pessoa ${pessoa} removida`});
  };
}

