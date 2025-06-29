# Documentação do Setup de Produção VPS AgroShield

Este documento descreve o setup de produção real usado para hospedar o servidor API do AgroShield em um VPS, incluindo decisões de infraestrutura, configurações e estratégia de deployment.

## Visão Geral da Arquitetura

O ambiente de produção do AgroShield usa uma arquitetura simples mas eficaz:

```
Internet → Cloudflare → Nginx (Reverse Proxy + SSL) → Docker Compose → Serviços API
```

### Stack de Infraestrutura

- **Servidor**: VPS Linux (baseado em Ubuntu)
- **Reverse Proxy**: Nginx com terminação SSL
- **SSL**: Certificados Let's Encrypt com renovação automática
- **Containerização**: Docker + Docker Compose
- **Banco de Dados**: TimescaleDB (extensão PostgreSQL) no Docker
- **Aplicação**: API Node.js Fastify no Docker

## Configuração de Domínio e SSL

### Setup do Domínio
- **Domínio API**: `api.agroshield.co`
- **DNS**: Registro A apontando para IP do VPS
- **Provedor SSL**: Let's Encrypt (gratuito, automatizado)

### Gerenciamento de Certificado SSL
```bash
# Localização do certificado (gerenciado pelo Certbot)
/etc/letsencrypt/live/api.agroshield.co/fullchain.pem
/etc/letsencrypt/live/api.agroshield.co/privkey.pem
```

**Características principais**:
- Redirecionamento automático de HTTP para HTTPS
- Renovação automática de certificado via cron
- Configuração SSL moderna (TLS 1.2+)

## Configuração do Reverse Proxy Nginx

A configuração do nginx serve como reverse proxy com terminação SSL:

### Configuração Completa do Nginx
```nginx
# Bloco de Servidor HTTPS
server {
    server_name api.agroshield.co;

    # Verificação de certificado Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Proxy principal da API
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Manipulação de CORS removida - gerenciada pela aplicação Fastify
    }

    # Endpoint de health check
    location /health {
        proxy_pass http://localhost:3001/health;
        access_log off;
    }

    # Configuração SSL (gerenciada pelo Certbot)
    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/api.agroshield.co/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.agroshield.co/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

# Redirecionamento HTTP para HTTPS
server {
    if ($host = api.agroshield.co) {
        return 301 https://$host$request_uri;
    }
    
    listen 80;
    listen [::]:80;
    server_name api.agroshield.co;
    return 404;
}
```

### Decisões de Configuração

#### 1. **Manipulação de CORS**
- **Decisão**: Remover headers CORS do nginx
- **Justificativa**: Deixar a aplicação Fastify lidar com CORS para evitar conflitos de headers
- **Benefício**: Lógica de CORS centralizada, mais fácil de manter

#### 2. **Rota de Health Check**
- **Endpoint**: `/health`
- **Propósito**: Health checks de load balancer e monitoramento

#### 3. **Headers de Proxy**
- **X-Real-IP**: IP original do cliente
- **X-Forwarded-For**: Cadeia de encaminhamento de IP
- **X-Forwarded-Proto**: Protocolo original (https)
- **Propósito**: Permitir que a API identifique informações reais do cliente

## Setup do Docker Compose em Produção

### Localização do Arquivo
```
/root/projects/agroshield-monorepo/docker-compose.yaml
```

### Arquitetura de Serviços
```yaml
services:
  # Banco TimescaleDB
  db:
    image: timescale/timescaledb:latest-pg14
    ports: ["5432:5432"]
    volumes: [timescale-data:/var/lib/postgresql/data]
    healthcheck: pg_isready check
    
  # Migrações do banco
  migrate:
    build: packages/data-access/Dockerfile.migrate
    depends_on: [db: service_healthy]
    restart: "no"  # Executa uma vez e sai
    
  # Servidor API
  api-server:
    build: apps/api-server/Dockerfile
    ports: ["3001:3000"]
    depends_on: [db: service_healthy, migrate: service_completed_successfully]
```

### Estratégia de Mapeamento de Portas
- **Porta Interna do Container**: 3000
- **Porta do Host**: 3001
- **Acesso Externo**: Porta 443 (HTTPS) → nginx → localhost:3001

### Gerenciamento de Dependências
1. **Banco inicia** e fica saudável
2. **Migrações executam** e completam com sucesso
3. **Servidor API inicia** apenas após dependências estarem prontas

## Gerenciamento de Ambiente

### Localização do Arquivo de Ambiente
```
/root/projects/agroshield-monorepo/.env
```

### Variáveis de Ambiente
```bash
# Configuração da Aplicação
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Conexão do Banco de Dados
DB_NAME=agroshield
DB_USER=postgres  
DB_PASSWORD=senha_segura_producao
DB_HOST=db  # Nome do serviço Docker Compose
DB_PORT=5432

# Parâmetros de Lógica de Negócio
RISK_MARGIN=0.06
OPS_COST=0.3
PROJECT_PROFIT=0.15

# Configuração de API Externa
OPEN_METEO_RATE_LIMIT=60
```

### Estratégia de Gerenciamento de Ambiente
- **GitHub Secrets**: Armazenar valores sensíveis nos secrets do repositório GitHub
- **Deployment Automatizado**: GitHub Actions cria arquivo `.env` no deployment
- **Sem Configuração Manual**: Ambiente totalmente automatizado

## Estratégia de Deployment

### Integração com GitHub Actions
O deployment do VPS é totalmente automatizado através do GitHub Actions:

1. **Trigger**: Push para branch `main`
2. **Conexão SSH**: Setup SSH automatizado usando chave privada
3. **Criação de Ambiente**: Arquivo `.env` criado a partir dos GitHub secrets
4. **Atualização de Código**: `git pull origin main` 
5. **Reinício de Serviços**: `docker compose down && docker compose up -d --build`

### Estrutura do Projeto no VPS
```
/root/projects/agroshield-monorepo/
├── .env                    # Variáveis de ambiente (auto-gerado)
├── docker-compose.yaml     # Orquestração de produção
├── apps/api-server/        # Código da aplicação API
├── packages/data-access/   # Camada de banco de dados
└── packages/core-domain/   # Lógica de negócio
```

## Gerenciamento do Banco de Dados

### Configuração do TimescaleDB
- **Imagem**: `timescale/timescaledb:latest-pg14`
- **Extensões**: TimescaleDB para dados de série temporal
- **Persistência**: Volume Docker `timescale-data`
- **Monitoramento de Saúde**: Verificações `pg_isready` do PostgreSQL

### Estratégia de Migração
- **Ferramenta**: Drizzle ORM com `drizzle-kit`
- **Execução**: Automatizada via container Docker dedicado
- **Timing**: Antes da inicialização do servidor API
- **Segurança**: Bloqueia inicialização da API se migrações falharem

### Acesso ao Banco
- **Interno**: API conecta via rede Docker (`db:5432`)
- **Externo**: Acesso direto via porta 5432 do VPS (se necessário)
- **Backup**: Estratégia de backup manual necessária

## Configuração de Segurança

### Segurança SSL/TLS
- **Protocolos**: TLS 1.2, TLS 1.3
- **Certificado**: Let's Encrypt com renovação automática
- **Configuração**: Gerenciada pelo Certbot
- **Redirecionamento**: Redirecionamento automático HTTP para HTTPS

### Segurança de Rede
- **Firewall**: Firewall padrão do VPS (portas 22, 80, 443)
- **SSH**: Autenticação apenas por chave
- **Rede de Containers**: Rede Docker isolada para serviços
- **Banco de Dados**: Não exposto externamente (apenas via rede Docker)

### Segurança da Aplicação
- **CORS**: Manipulado pela camada da aplicação Fastify
- **Ambiente**: Dados sensíveis nos GitHub secrets
- **Container**: Execução com usuário não-root (recomendado)

## Monitoramento e Logging

### Logs da Aplicação
```bash
# Ver logs da API em tempo real
docker compose logs -f api-server

# Ver logs de migração
docker compose logs migrate

# Ver logs do banco
docker compose logs db
```

### Monitoramento do Sistema
```bash
# Status dos containers
docker compose ps

# Uso de recursos
docker stats

# Recursos do sistema
htop, df -h, free -h
```

### Health Checks
- **Saúde da API**: `https://api.agroshield.co/health`
- **Saúde do Banco**: Health checks PostgreSQL integrados
- **Saúde dos Containers**: Integração de health check do Docker Compose

## Procedimentos Operacionais

### Processo de Deployment
```bash
# Automatizado via GitHub Actions no push para main:
1. SSH no VPS
2. Navegar para diretório do projeto
3. Pull do código mais recente
4. Parar containers em execução
5. Rebuild e iniciar containers
```

### Operações Manuais
```bash
# Deployment manual (se necessário)
cd /root/projects/agroshield-monorepo
git pull origin main
docker compose down
docker compose up -d --build

# Ver status da aplicação
docker compose ps
docker compose logs api-server

# Acesso ao banco
docker compose exec db psql -U postgres agroshield
```

### Solução de Problemas
```bash
# Verificar status dos containers
docker compose ps

# Ver logs detalhados
docker compose logs --details api-server

# Reiniciar serviço específico
docker compose restart api-server

# Reinício completo do sistema
docker compose down && docker compose up -d
```

## Considerações de Performance

### Otimização do Docker
- **Builds multi-stage**: Minimizar tamanho da imagem de produção
- **Cache de camadas**: Ordenação otimizada de camadas do Dockerfile
- **Limites de recursos**: Considerar restrições de recursos dos containers

### Performance do Banco
- **TimescaleDB**: Otimizado para dados de série temporal meteorológica
- **Pool de conexões**: Considerar para cenários de alta concorrência
- **Indexação**: Garantir indexação adequada para performance de consultas

## Backup e Recuperação

### Estratégia Atual de Backup
- **Banco de Dados**: Backup manual necessário
- **Aplicação**: Código armazenado no repositório Git
- **Ambiente**: Armazenado nos GitHub secrets

### Implementação Recomendada de Backup
```bash
# Script de backup do banco
docker compose exec db pg_dump -U postgres agroshield > backup_$(date +%Y%m%d).sql

# Backup automatizado via cron
0 2 * * * cd /root/projects/agroshield-monorepo && docker compose exec -T db pg_dump -U postgres agroshield > /root/backups/db_$(date +\%Y\%m\%d).sql
```

## Considerações de Escalabilidade

### Limitações Atuais
- **VPS Único**: Sem escalabilidade horizontal
- **Banco Único**: Sem clustering de banco
- **Sem Load Balancing**: Nginx direto para instância única da API

### Opções Futuras de Escalabilidade
- **Escalabilidade Horizontal**: Múltiplos containers API atrás de load balancer
- **Escalabilidade do Banco**: Réplicas de leitura ou clustering
