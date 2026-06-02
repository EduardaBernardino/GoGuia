import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../drizzle/db/schema";  
import 'dotenv/config';



export class Conexao {
  private static dbInstance:  ReturnType<typeof drizzle<typeof schema>>;


  public static conexao() {
    if (!Conexao.dbInstance) {
      try {
        const dbFile = `${process.env.DB_FILE_NAME}.db`;

        if (!dbFile) {
          throw new Error("❗ DB_FILE_NAME não definido no .env");
        }

        const sqlite = new Database(dbFile);
        Conexao.dbInstance = drizzle(sqlite, { schema });

        console.log("🌐 Conexão com o banco realizado com sucesso\n");
        

      } catch (erro) {
        console.error("⛔ Erro ao conectar com o banco:", erro);
        throw erro;
      }
      
    }

    return Conexao.dbInstance;
  }
}