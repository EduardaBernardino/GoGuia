import app from "../../app";
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

export const db = Conexao.conexao();
