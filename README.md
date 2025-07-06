# AgroShield

## Visão Geral

O AgroShield é uma plataforma descentralizada de seguro paramétrico para cultivos, construída na blockchain Fuel. Utiliza uma arquitetura de monólito modular com separação clara entre componentes on-chain (contratos inteligentes) e off-chain (TypeScript/Node.js).

## Estrutura Principal

```
agroshield-monorepo/
├── apps/                         # Aplicações principais
│   ├── api-server/               # Servidor API (Fastify)
│   ├── app/                      # Frontend Vite
│   ├── landing-page/             # Frontend NextJS
│   └── indexer/                  # Indexador Envio
└── packages/                     # Pacotes compartilhados
    ├── contracts/                # Contratos Sway (Fuel)
    ├── core-domain/              # Lógica de negócio pura
    ├── data-access/              # Repositórios e acesso a dados
    ├── graphql-client/           # Cliente GraphQL
    ├── graphql-queries/          # Consultas GraphQL
    ├── graphql-types/            # Tipos GraphQL
    └── docs/                     # Documentação
```

## Arquitetura em Camadas

### 1. Contratos Inteligentes (`packages/contracts/`)
Contratos Sway executados na blockchain Fuel:

- **`insurance-contract`**: Gerenciamento principal de apólices e pagamentos
- **`insurance-manager`**: Rastreamento de status das apólices
- **`insurance-nft`**: Representação NFT das apólices

### 2. Domínio Central (`packages/core-domain/`)
Lógica de negócio pura sem dependências externas:
- Entidades de domínio
- Objetos de valor
- Regras de negócio
- Zero dependências de banco de dados ou APIs

### 3. Acesso a Dados (`packages/data-access/`)
Implementação do padrão Repository para dados externos:
- Repositórios de banco de dados
- Clientes de API meteorológica (Open-Meteo, OpenWeather)
- Único responsável pela persistência e chamadas de API externas

### 4. Servidor API (`apps/api-server/`)
Servidor HTTP Fastify:
- Endpoints REST para o frontend
- Processamento de dados meteorológicos
- Cotação das apólices

### 5. Frontend (`apps/app/`)
Aplicação React com integração Fuel:
- Vite, TailwindCSS, componentes shadcn/ui
- Integração com connectors de carteira Fuel
- Interface para criação e gerenciamento de apólices

### 6. Indexador (`apps/indexer/`)
Indexador Fuel para eventos blockchain:
- Monitora contratos inteligentes
- Processa eventos on-chain
- Sincroniza dados com banco off-chain

## Dependências Principais

### Monorepo
- **PNPM Workspaces**: Gerenciamento de dependências
- **Turborepo**: Orquestração de builds

### Fuel Toolchain
- **forc**: v0.67.0 (compilador Sway)
- **fuel-core**: v0.41.9 (nó Fuel)

### Frontend
- **React 19**: Framework principal
- **Vite**: Build tool
- **TailwindCSS v4**: Estilização
- **Fuel React SDK**: Integração blockchain

### Backend
- **Fastify**: Servidor HTTP
- **TypeScript**: Linguagem principal
- **Biome**: Linting e formatação

## Comandos de Desenvolvimento

### Instalação e Build
```bash
# Instalar dependências
pnpm install

# Build completo do monorepo
pnpm build
```

### Aplicações Específicas
```bash
# Frontend React
pnpm --filter @agroshield/app dev

# Servidor API
pnpm --filter @agroshield/api-server dev
```

### Contratos Sway
```bash
# Formatar contratos
pnpm forc:fmt

# Compilar contratos
pnpm forc:build

# Build contratos para frontend
pnpm --filter @agroshield/app fuels:build

# Deploy contratos
pnpm --filter @agroshield/app fuels:deploy
```

## Fluxo de Trabalho

### 1. Alterações em Contratos
1. Atualizar contratos Sway
2. Executar `pnpm forc:build`
3. Regenerar bindings frontend: `pnpm --filter @agroshield/app fuels:build`

### 2. Alterações Backend
1. Modificações no core-domain fluem através do data-access
2. Chegam ao api-server

### 3. Desenvolvimento Frontend
1. Usa Fuel testnet
2. Interação com contratos através de bindings gerados

## Estrutura de Dependências

```
@agroshield/core-domain
    ↓
@agroshield/data-access
    ↓
@agroshield/api-server

@agroshield/graphql-types
    ↓
@agroshield/graphql-queries
    ↓
@agroshield/graphql-client
    ↓
Aplicações Frontend
```

## Integração com Contratos

O frontend se comunica com contratos inteligentes através de bindings TypeScript gerados em `apps/app/src/sway-contracts-api/`. Estes são gerados automaticamente a partir dos contratos Sway usando o toolchain Fuel.

## Padronização de Código com Biome

O projeto utiliza **Biome** como ferramenta unificada para linting, formatação e análise de código. Biome oferece:

- **Performance superior**: Mais rápido que ESLint + Prettier
- **Configuração zero**: Funciona out-of-the-box com configurações sensatas
- **Consistência**: Garantia de estilo de código uniforme em todo o monorepo
- **TypeScript nativo**: Suporte completo sem configurações adicionais

Todas as regras de estilo e qualidade são aplicadas automaticamente durante o desenvolvimento e build, garantindo que o código mantenha alta qualidade e consistência entre todos os colaboradores.

## Tecnologias Utilizadas

- **Blockchain**: Fuel Network
- **Contratos**: Sway
- **Backend**: Node.js, TypeScript, Fastify
- **Frontend**: React, Vite, TailwindCSS
- **Banco de Dados**: PostgreSQL
- **APIs**: Open-Meteo
- **DevOps**: Docker, pnpm, Turborepo