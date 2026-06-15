# 📦 GoGuia

Siga os passos abaixo para configurar e executar o projeto corretamente:

## 1. Instalar dependências

Execute o comando abaixo para instalar todos os pacotes necessários:

```bash
npm i
```

## 2. Configurar variáveis de ambiente

Abra o arquivo `.exemplo.env`, renomeie ele para `.env` e altere o valor da variável:

```env
DB_FILE_NAME=
```

Defina o nome do seu banco de dados conforme desejado.

## 3. Gerar e aplicar migrações (Drizzle)

Após configurar o banco, execute os comandos do Drizzle:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## 4. Executar as seeds

Após criar o banco, rode as seeds com o comando abaixo:

```bash
npm run seed
```

## 5. Executar o projeto

Por fim, inicie a aplicação com:

```bash
npm run dev
```

