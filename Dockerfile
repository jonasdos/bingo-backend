# estagio inicial

# define o framework e o estágio da montagem da imagem
FROM node AS builder
# define a pasta de trabalho dentro do container
WORKDIR /app
# copia os arquivos package.json para dentro da pasta raiz do container
COPY package*.json ./
# instala as dependências do projeto, tanto de produção quanto de desenvolvimento
RUN npm install
# copia os arquivos do projeto para dentro da pasta raiz do container
COPY . ./ 
# Executa o script "build" do package.json, que compila a estrutura do aplicativo para javascript e inclui tudo na pasta dist da raiz do projeto conforme configurado no tsconfig.json
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
RUN npm run build 

# Estagio final - Montagem da image somente com os arquivos essenciais. Importante frisar aqui que teremos 2 docker-compose: 
# docker-compose.test.yml: que será utilizado para rodar os testes no processo de CI/CD e utilizará() esse estagio inicial "builder" pois precisamos de todos os arquivos para rodar os testes.
# docker-compose.yml: que será utilizado para rodar a aplicação em produção e utilizará o estagio final "slim" que é mais leve e rápido, pois não precisamos de todos os arquivos do projeto, apenas os essenciais para rodar a aplicação.

# Escolhe o framework slim em virtude do tamanho da compatibilidade e em seguida remove o cache
FROM node:23-slim
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
# Define a pasta de trabalho
WORKDIR /app
# copia os arquivos da builder para a imagem final
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Documenta a porta padrão do container que será exposta ao host
EXPOSE 3000
# instala só dependências de produção
RUN npm install --omit=dev
CMD ["npm", "start"]