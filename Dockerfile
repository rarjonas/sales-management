# syntax=docker/dockerfile:1

# Etapa 1: Build da aplicação
FROM node:22.8.0-alpine AS build
WORKDIR /usr/src/app

# Instale pnpm globalmente
RUN npm install -g pnpm

# Copie apenas os arquivos de dependências primeiro para cache eficiente
COPY package.json pnpm-lock.yaml ./

# Instale todas as dependências (incluindo devDependencies para build)
RUN pnpm install --frozen-lockfile

# Copie o restante do código
COPY . .

# Compile a aplicação
RUN pnpm run build

# Etapa 2: Imagem final, apenas com o necessário para rodar
FROM node:22.8.0-alpine AS prod
WORKDIR /usr/src/app

# Instale pnpm globalmente
RUN npm install -g pnpm

# Copie apenas os arquivos necessários da etapa de build
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/pnpm-lock.yaml ./
COPY --from=build /usr/src/app/dist ./dist

# Instale apenas dependências de produção
RUN pnpm install --frozen-lockfile --prod

# Use usuário não-root por segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Exponha a porta padrão da aplicação
EXPOSE 3000

# Defina variáveis de ambiente padrão
ENV NODE_ENV=production

# Healthcheck para verificar se a aplicação está rodando
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando para rodar a aplicação
CMD ["node", "dist/main.js"]
