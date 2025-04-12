# estagio inicial
# define o framework e o estágio da montagem da imagem
FROM node:20 AS builder
# define a pasta de trabalho dentro do container
WORKDIR /app
# copia os arquivos package.json para dentro da pasta raiz do container
COPY package*.json ./
# copia os arquivos da pasta prisma para dentro de /app
COPY prisma ./prisma/
# copia o arquivo de configuração do TypeScript para o diretório de trabalho
COPY tsconfig.json ./
# copia a estrutura do projeto para dentor do diretório
COPY src ./src/
# instala todas as dependências /node_modules
RUN npm install
# Executa o script "build" do package.json, Compila a estrutura do aplicativo para javascript, cria a pasta dist conforme configurado no tsconfig.json
RUN npm run build 
# Estagio final - montagem da imagem
# Escolhe o framework alpine em virtude do tamanho
FROM node:20-slim
RUN apt-get update && apt-get install -y openssl
# Define a pasta de trabalho
WORKDIR /app
# copia os arquivos da builder para a imagem final
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
# Documenta a porta padrão do container que será exposta ao host
EXPOSE 3000
# instala só dependências de produção
RUN npm install --omit=dev
CMD ["npm", "start"]