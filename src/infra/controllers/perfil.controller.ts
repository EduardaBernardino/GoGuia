import { Request, Response } from "express";
import { PerfilRepository } from "../repository/perfil-repository";
import { PerfilPresenter } from "../presenters/perfil-present";
import { CreatePerfilDTO } from "../../domain/perfil/dto/creat-perfil-dto";
import { Perfil } from "../../domain/perfil/type/perfil-interface";
import { UpdatePerfilDTO } from "../../domain/perfil/dto/update-perfil-dto";


export class PerfilController {

  private readonly perfilRepository = new PerfilRepository

  async getAllPerfil(req: Request, res: Response) {
    const perfils = await this.perfilRepository.findAll()

    if (!perfils) {
      return res.status(404).json({
        message: "Não foi achar perfil"
      });
    }

    res.status(201).json(PerfilPresenter.listaResposePresenter(perfils));
  };

  async createPerfil(
    req: Request<{}, {}, CreatePerfilDTO>,
    res: Response
  ) {
    const perfilNew = Perfil.create(req.body)
    const perfil = await this.perfilRepository.create(perfilNew)

    if (!perfil) {
      return res.status(500).json({
        message: "Não foi possível criar a perfil"
      });
    }

    res.status(201).json(PerfilPresenter.resposePresenter(perfil));
  };

  async updatePerfil(req: Request, res: Response) {

    const perfil = await this.perfilRepository.update(
      Number(req.params.id),
      req.body as UpdatePerfilDTO
    );

    if (!perfil) {
      return res.status(500).json({
        message: "Não foi possível atualizar a perfil"
      });
    }

    res.status(201).json(PerfilPresenter.resposePresenter(perfil));
  };

  async deletePerfil(req: Request, res: Response) {

    const perfil = await this.perfilRepository.delete(Number(req.params.id));
    
    if (!perfil) {
      return res.status(500).json({
        message: "Não foi possível excluir a perfil"
      });
    }

    res.status(201).json({message:`Perfil ${perfil} removida`});
  };
}

