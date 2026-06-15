import app from "../../app";
import { minioClient } from "../minio/minio.client";
import { Conexao } from "./conexao";

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`🌐 Servidor rodando na porta ${PORT}`);
});

export const closeServer = () => {
    server.close((err) => {
        if (err) {
            console.error('❌ Erro ao fechar servidor:', err);
            process.exit(1);
        }
        console.log('✅ Servidor encerrado com sucesso');
        process.exit(0);
    });
};

const verificacaoMinio = async () => {
    try {
        await minioClient.bucketExists(process.env.BUCKET_NAME || "goguia");
        console.log("\n🌐 MinIO está rodando");
    } catch (error) {
        console.log("\n ❌ MinIO não está disponível ou não está rodando");
    }
}

verificacaoMinio()

export const db = Conexao.conexao();
