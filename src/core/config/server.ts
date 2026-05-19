import app from "../../app";
import { Conexao } from "./conexao";

const PORT = 3000

app.listen(PORT, () => {
    console.log(`🌐 Servidor rodando na porta ${PORT}`);
});

export const db = Conexao.conexao();
