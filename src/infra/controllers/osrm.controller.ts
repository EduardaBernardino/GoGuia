import { Request, Response } from "express";
import { RoteiroRepository } from "../repository/roteiro-repository";
import { RoteiroPresenter } from "../presenters/roteiro-present";
import { CreateRoteiroDTO } from "../../domain/roteiro/dto/creat-roteiro-dto";
import { Roteiro } from "../../domain/roteiro/type/roteiro-interface";
import { UpdateRoteiroDTO } from "../../domain/roteiro/dto/update-roteiro-dto";


export class OsrmController {
  private cache = new Map();

  async getMapa(req: Request, res: Response) {
    try {
      const coordinates = req.query.coordinates as string;

      if (!coordinates) {
        return res.status(400).json({
          error: "Coordenadas são obrigatórias"
        });
      }

      const coordPairs = coordinates.split(';');
      for (const pair of coordPairs) {
        const [lng, lat] = pair.split(',');
        if (!lng || !lat || isNaN(Number(lng)) || isNaN(Number(lat))) {
          return res.status(400).json({
            error: "Formato de coordenadas inválido"
          });
        }
      }

      // Cache (opcional)
      const cacheKey = coordinates;
      if (this.cache.has(cacheKey)) {
        console.log('Retornando do cache');
        return res.json(this.cache.get(cacheKey));
      }

      // Faz a requisição para a OSRM
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
      );

      if (!response.ok) {
        throw new Error(`Erro na OSRM: ${response.status}`);
      }

      const data = await response.json();

      // Salvar no cache por 5 minutos
      this.cache.set(cacheKey, data);
      setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);

      // Retorna os dados
      res.json(data);

    } catch (error) {
      console.error("Erro no proxy OSRM:", error);
      res.status(500).json({
        error: "Erro ao buscar rota",
        details: error
      });
    }
  };


}

