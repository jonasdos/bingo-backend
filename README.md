# Bingo Driven - Backend

Este é o repositório do backend do projeto **Bingo Driven**, uma aplicação desenvolvida em Node.js com Express e Prisma. O objetivo é fornecer uma API robusta para gerenciar jogos de bingo, incluindo criação de jogos, extração de números, finalização de partidas e consulta de resultados de jogos anteriores.

## Deploy

O deploy online pode ser alcançado nesse link:
https://bingo-backend-zzlp.onrender.com ( veja a seção **Endpoints da API**)

O repositório do frontend do projeto está disponível em:  
[https://github.com/jonasdos/bingo-frontend](https://github.com/jonasdos/bingo-frontend)

---

## Executando o Projeto com Docker

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado na sua máquina.

### Subindo o Projeto com Docker Compose

1. Certifique-se de que o arquivo `.env` está configurado corretamente (veja a seção **Configuração do Ambiente**).
2. No terminal, execute o comando abaixo na raiz do projeto:

```bash
docker-compose up
```

3. Acesse a API no navegador ou via ferramentas como Postman em:  
   [http://localhost:3000](http://localhost:3000)

---

## Executando os Testes com Docker

1. Certifique-se de que o arquivo `.env.test` está configurado corretamente (veja a seção **Configuração do Ambiente**).
2. Execute o comando abaixo para rodar os testes:

```bash
docker-compose -f docker-compose-tests.yml up --abort-on-container-exit
```

3. Após a execução, remova os contêineres e volumes criados:

```bash
docker-compose -f docker-compose-tests.yml down -v
```

---

## Executando o Projeto Localmente (Sem Docker)

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado na sua máquina.
- [PostgreSQL](https://www.postgresql.org/) configurado e rodando.

### Passos

1. Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias (veja a seção **Configuração do Ambiente**).
2. Instale as dependências do projeto:

```bash
npm install
```

3. Execute as migrações do banco de dados:

```bash
npm run migration:run
```

4. Inicie o servidor:

```bash
npm run dev
```

5. Acesse a API no navegador ou via ferramentas como Postman em:  
   [http://localhost:3000](http://localhost:3000)

---

## Configuração do Ambiente

### Arquivo `.env`

Configure o arquivo `.env` para o ambiente de produção ou desenvolvimento. Exemplo:

```
DATABASE_URL=postgresql://user:password@localhost:5432/bingo
PORT=3000
```

### Arquivo `.env.test`

Configure o arquivo `.env.test` para o ambiente de testes. Exemplo:

```
DATABASE_URL=postgresql://user:password@localhost:5432/bingo_test
PORT=3000
```

---

## Executando os Testes

### Pré-requisitos

Certifique-se de que o banco de dados de teste está configurado corretamente.

### Rodando os Testes

1. Execute as migrações no banco de dados de teste:

```bash
npm run migration:run
```

2. Execute os testes:

```bash
npm run test
```

3. Para gerar um relatório de cobertura de testes, execute:

```bash
npm run test:coverage
```

---

## Endpoints da API

### Health Check

- **GET /health**  
  Retorna o status da aplicação.

### Gerenciamento de Jogos

- **GET /games/:id**  
  Retorna os detalhes de um jogo pelo ID.

- **POST /games/start**  
  Cria um novo jogo.

- **PATCH /games/number/:id**  
  Gera um novo número para o jogo especificado.

- **PATCH /games/finish/:id**  
  Finaliza o jogo especificado.

---

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no backend.
- **Express**: Framework para construção de APIs.
- **Prisma**: ORM para interação com o banco de dados PostgreSQL.
- **Jest**: Framework de testes.
- **Docker**: Containerização para facilitar o deploy e execução.
- **PostgreSQL**: Banco de dados relacional.

---
