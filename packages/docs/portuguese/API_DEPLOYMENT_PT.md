# Guia de Deploy do Servidor API AgroShield

Este documento descreve a estratégia de deployment do servidor API do AgroShield usando GitHub Actions, Docker e Docker Compose.

## Visão Geral

O pipeline de deployment automaticamente constrói e faz o deploy do servidor API para um VPS sempre que mudanças são enviadas para a branch `main`. O sistema utiliza:

- **GitHub Actions** para pipeline CI/CD
- **Docker** para containerização  
- **Docker Compose** para orquestração
- **Migrações de banco** para gerenciamento de schema
- **Builds multi-stage** para imagens de produção otimizadas

## Arquitetura

### Serviços

1. **Database (db)**: Instância TimescaleDB PostgreSQL
2. **Migration (migrate)**: Executa migrações de schema do banco
3. **API Server (api-server)**: Aplicação Node.js com Fastify

### Fluxo de Deployment

```
Push para main → GitHub Actions → VPS → Docker Compose → Serviços Iniciam
```

## Estrutura de Arquivos

```
.github/workflows/api-deploy.yml # Pipeline CI/CD
apps/api-server/Dockerfile      # Imagem Docker de produção
packages/data-access/Dockerfile.migrate  # Container de migração
docker-compose.yaml              # Orquestração de produção
```

## Pipeline GitHub Actions

### Workflow: `.github/workflows/api-deploy.yml`

O pipeline consiste em um único job de deploy:

#### Job de Deploy
- **Triggers**: Push para branch `main`
- **Passos**:
  1. **Checkout do código** - Usa `actions/checkout@v3`
  2. **Configurar SSH** - Configura chave SSH e conexão com VPS
  3. **Upload do arquivo .env** - Cria arquivo de ambiente no VPS a partir dos GitHub secrets
  4. **Verificar arquivo .env** - Exibe o arquivo de ambiente criado para verificação
  5. **Deploy com Docker Compose** - Puxa código, para containers, rebuilda e inicia

#### Características Principais:
- **Gerenciamento de ambiente** - Cria arquivo `.env` a partir dos GitHub secrets
- **Configuração SSH** - Configura conexão SSH com config customizado
- **Deploy Docker Compose** - Usa comandos `docker compose`

### Secrets Necessários

Configure estes nas configurações do repositório GitHub:

```
# Configuração SSH
SSH_PRIVATE_KEY  # Chave SSH privada para acesso ao VPS
SSH_HOST         # Endereço IP do VPS
SSH_USER         # Nome de usuário SSH

# Variáveis de Ambiente da Aplicação
NODE_ENV
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
RISK_MARGIN
OPS_COST
PROJECT_PROFIT
OPEN_METEO_RATE_LIMIT
```

## Configuração Docker

### Dockerfile de Produção (`apps/api-server/Dockerfile`)

**Build multi-stage**:

1. **Base stage**: Instalar dependências e buildar TypeScript
2. **Production stage**: Copiar artefatos buildados, instalar apenas dependências de produção

**Características principais**:
- Imagem base Node.js 22 Alpine
- Gerenciador de pacotes pnpm
- Suporte a configuração de workspace
- Compilação de módulos CommonJS
- Camadas otimizadas para produção

### Dockerfile de Migração (`packages/data-access/Dockerfile.migrate`)

**Propósito**: Executar migrações de schema do banco usando Drizzle

**Características**:
- Imagem Alpine Node.js leve
- Executa uma vez e sai
- Bloqueia inicialização da API até completar

## Docker Compose

### Produção (`docker-compose.yaml`)

#### Serviço de Banco
```yaml
db:
  image: timescale/timescaledb:latest-pg14
  environment:
    POSTGRES_DB: ${DB_NAME}
    POSTGRES_USER: ${DB_USER}
    POSTGRES_PASSWORD: ${DB_PASSWORD}
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres"]
```

#### Serviço de Migration
```yaml
migrate:
  build:
    dockerfile: packages/data-access/Dockerfile.migrate
  environment:
    - DB_HOST=db
  depends_on:
    db:
      condition: service_healthy
  restart: "no"
```

#### Serviço da API
```yaml
api-server:
  build:
    dockerfile: apps/api-server/Dockerfile
  ports:
    - "3001:3000"
  depends_on:
    db:
      condition: service_healthy
    migrate:
      condition: service_completed_successfully
```


## DB Migrations

### Estratégia

Migrações executam automaticamente a cada deployment usando o serviço `migrate`.

**Processo**:
1. Banco inicia e fica saudável
2. Container de migração executa `pnpm migrate:push`
3. Container de migração sai após completar
4. Servidor API inicia apenas após migrações terem sucesso

### Migração Manual

Se necessário, execute migrações manualmente no VPS:

```bash
# Da raiz do projeto
cd /root/projects/agroshield-monorepo

# Definir variáveis de ambiente e executar
DB_NAME=agroshield DB_USER=postgres DB_PASSWORD=sua_senha \
DB_HOST=localhost DB_PORT=5432 \
pnpm --filter @agroshield/data-access migrate:push
```

## Comandos de Deployment

### Deployment de Produção
```bash
# No VPS
cd /root/projects/agroshield-monorepo
git pull origin main
docker-compose down
docker-compose up -d --build
```

## Otimização de Build

### Performance do Docker Build

O projeto usa `.dockerignore` para excluir arquivos desnecessários:

```
**/node_modules
**/dist
**/.env*
.git
```

### COMPOSE_BAKE

Para melhor performance de build, defina:
```bash
export COMPOSE_BAKE=true
```

Isso habilita Docker Buildx bake para builds paralelos.
