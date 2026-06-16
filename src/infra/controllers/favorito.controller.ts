import { Request, Response } from "express";

import { CreateFavoritoDTO } from "../../domain/favorito/dto/creat-favorito-dto";
import { Favorito } from "../../domain/favorito/type/favorito-interface";
import { UpdateFavoritoDTO } from "../../domain/favorito/dto/update-favorito-dto";
import { FavoritoPresenter } from "../presenters/favorito-present";
import { FavoritoRepository } from "../repository/favorito-repository";


export class FavoritoController {

  private readonly favoritoRepository = new FavoritoRepository

  async getAllFavorito(req: Request, res: Response) {
    const favoritos = await this.favoritoRepository.findAll()

    if (!favoritos) {
      return res.status(404).json({
        message: "Não foi achar favorito"
      });
    }

    res.status(201).json(FavoritoPresenter.listaResposePresenter(favoritos));
  };

  async createFavorito(
    req: Request<{}, {}, CreateFavoritoDTO>,
    res: Response
  ) {
    const favoritoNew = Favorito.create(req.body)
    const favorito = await this.favoritoRepository.create(favoritoNew)

    if (!favorito) {
      return res.status(500).json({
        message: "Não foi possível criar a favorito"
      });
    }

    res.status(201).json(FavoritoPresenter.resposePresenter(favorito));
  };

  async updateFavorito(req: Request, res: Response) {

    const favorito = await this.favoritoRepository.update(
      Number(req.params.id),
      req.body as UpdateFavoritoDTO
    );

    if (!favorito) {
      return res.status(500).json({
        message: "Não foi possível atualizar a favorito"
      });
    }

    res.status(201).json(FavoritoPresenter.resposePresenter(favorito));
  };

  async deleteFavorito(req: Request, res: Response) {

    const favorito = await this.favoritoRepository.delete(Number(req.params.id));
    
    if (!favorito) {
      return res.status(500).json({
        message: "Não foi possível excluir a favorito"
      });
    }

    res.status(201).json({message:`Favorito ${favorito} removida`});
  };
}

