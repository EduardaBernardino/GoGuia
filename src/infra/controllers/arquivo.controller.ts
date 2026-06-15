import { Request, Response } from "express";
import { CreateArquivoDTO } from "../../domain/arquivo/dto/creat-arquivo-dto";
import { Arquivo } from "../../domain/arquivo/type/arquivo-interface";
import { UpdateArquivoDTO } from "../../domain/arquivo/dto/update-arquivo-dto";
import { ArquivoRepository } from "../repository/arquivo-repository";
import { ArquivoPresenter } from "../presenters/arquivo-present";
import { minioClient } from "../../core/minio/minio.client";


export class ArquivoController {

  private readonly arquivoRepository = new ArquivoRepository

  async getAllArquivo(req: Request, res: Response) {
    const arquivos = await this.arquivoRepository.findAll()

    if (!arquivos) {
      return res.status(404).json({
        message: "Não foi achar arquivo"
      });
    }

    res.status(201).json(ArquivoPresenter.listaResposePresenter(arquivos));
  };

  async getImageArquivo(req: Request, res: Response) {
    
    if (!req.params.id) {
      return res.status(404).json({
        message: "Não foi passado o ID do arquivo"
      });
    }
    const arquivos = await this.arquivoRepository.findById(Number(req.params.id))
    const bucketName = process.env.BUCKET_NAME || "goguia"

    if (!arquivos?.data.localArquivo) {
      return res.status(404).json({
        message: "Não foi achar arquivo"
      });
    }

    const url = await minioClient.presignedGetObject(
      bucketName,
      arquivos.data.localArquivo,
      30,
    );

    res.status(201).json({ url: url });
  };

  async updateArquivo(req: Request, res: Response) {

    const arquivo = await this.arquivoRepository.update(
      Number(req.params.id),
      req.body as UpdateArquivoDTO
    );

    if (!arquivo) {
      return res.status(500).json({
        message: "Não foi possível atualizar a arquivo"
      });
    }

    res.status(201).json(ArquivoPresenter.resposePresenter(arquivo));
  };

  async deleteArquivo(req: Request, res: Response) {

    const arquivo = await this.arquivoRepository.delete(Number(req.params.id));

    if (!arquivo) {
      return res.status(500).json({
        message: "Não foi possível excluir a arquivo"
      });
    }

    res.status(201).json({ message: `Arquivo ${arquivo} removida` });
  };

  async uploadArquivo(
    req: Request,
    res: Response
  ) {

    if (!req.file) {
      return res.status(400).json({
        message: "Arquivo não enviado",
      });
    }

    const { codRoteiro } = req.body;
    const bucketName = process.env.BUCKET_NAME || "goguia";
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const exists = await minioClient.bucketExists(bucketName);

    if (!exists) await minioClient.makeBucket(bucketName, "us-east-1");

    await minioClient.putObject(
      bucketName,
      fileName,
      req.file.buffer,
      req.file.size,
      { "Content-Type": req.file.mimetype, }
    );

    const arquivo = await this.arquivoRepository.create(
      Arquivo.create({
        codRoteiro: Number(codRoteiro),
        nomeArquivo: req.file.originalname,
        localArquivo: fileName,
        arquivoAtivo: true,
      })
    );

    if (!arquivo) {
      return res.status(500).json({
        message: "Não foi possível criar o arquivo"
      });
    }

    return res.status(201).json(ArquivoPresenter.resposePresenter(arquivo));
  }
}

