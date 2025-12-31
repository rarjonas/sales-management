# Sales Management API

API REST desenvolvida com Fastify, TypeScript e arquitetura hexagonal para gerenciamento de vendas.

## 🚀 Tecnologias

- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática
- **Zod** - Validação de schemas
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização
- **Biome** - Linter e formatador de código
- **Scalar** - Documentação interativa da API

## 📋 Pré-requisitos

- Node.js 22+
- pnpm (gerenciador de pacotes)
- Docker e Docker Compose

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env.local` na raiz do projeto:

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
```

4. Inicie o banco de dados PostgreSQL:

```bash
docker-compose up -d
```

## 🎯 Comandos Disponíveis

### Desenvolvimento

```bash
# Inicia o servidor em modo desenvolvimento com hot-reload
pnpm dev
```

### Produção

```bash
# Compila o projeto
pnpm build

# Inicia o servidor em produção
pnpm start
```

### Qualidade de Código

```bash
# Verifica problemas de lint
pnpm lint

# Formata o código
pnpm format
```

### Docker

```bash
# Inicia o banco de dados
docker-compose up -d

# Para o banco de dados
docker-compose down

# Para e remove os volumes (apaga os dados)
docker-compose down -v
```

## 🔌 Endpoints

### Health Check

- `GET /health` - Verifica o status da aplicação

### Documentação da API

- `GET /reference` - Documentação interativa (Scalar)

## 🐛 Debug

O projeto está configurado para debug no VS Code.

### Como usar o Debug

1. Abra o painel de Debug no VS Code (Ctrl+Shift+D / Cmd+Shift+D)
2. Selecione a configuração **"Debug: Node.js"**
3. Clique em "Iniciar Debug" (F5) ou pressione F5

### Configurações de Debug Disponíveis

- **Debug: Node.js** - Inicia a aplicação em modo debug com breakpoints
- **Debug: Node.js (Attach)** - Conecta a um processo Node.js já em execução

### Variáveis de Ambiente para Debug

O arquivo `.env.local` é carregado automaticamente durante o debug. Para mais informações de log, defina:

```env
LOG_LEVEL=debug
```

### Breakpoints

Você pode adicionar breakpoints clicando na margem esquerda do editor, ao lado dos números das linhas. O debugger irá pausar a execução nesses pontos.

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NODE_ENV` | Ambiente de execução | `development` |
| `PORT` | Porta do servidor | `3000` |
| `LOG_LEVEL` | Nível de log (trace, debug, info, warn, error, fatal) | `info` |

## 🗄️ Banco de Dados

O PostgreSQL está configurado via Docker Compose:

- **Host**: `localhost`
- **Porta**: `5432`
- **Usuário**: `root`
- **Senha**: `123456`
- **Database**: `sales-management`

Os dados são persistidos em um volume Docker nomeado `sales-management-postgres-data`.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

ISC

