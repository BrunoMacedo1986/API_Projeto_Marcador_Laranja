# Etapa 1: Usar uma imagem base do Node.js
FROM node:18

# Etapa 2: Definir o diretório de trabalho dentro do container
WORKDIR /app

# Etapa 3: Copiar os arquivos de dependências para o container
COPY package*.json ./

# Etapa 4: Instalar as dependências
RUN npm install

# Etapa 5: Copiar o restante da aplicação para o container
COPY . .

# Etapa 6: Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Etapa 7: Definir o comando para rodar a aplicação no container
CMD ["node", "server.js"]
