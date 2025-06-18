# Configuração da API - AgroShield Landing Page

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Development
NODE_ENV=development
```

## Endpoints da API

### POST /leads
Endpoint para criar um novo lead na lista de espera.

**Payload:**
```json
{
  "name": "string",
  "email": "string", 
  "area": "string",
  "crop": "string",
  "city": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "area": "string", 
  "crop": "string",
  "city": "string",
  "createdAt": "string"
}
```

### GET /leads
Endpoint para buscar todos os leads (opcional, para admin).

## Configuração do Axios

O axios está configurado com:
- Base URL configurável via variável de ambiente
- Timeout de 10 segundos
- Interceptors para logging de requisições e respostas
- Headers padrão para JSON

## Estrutura de Arquivos

```
lib/
├── axios.ts          # Configuração do axios
└── leadService.ts    # Serviços para gerenciar leads
```

## Como Testar

1. Configure a variável `NEXT_PUBLIC_API_URL` no `.env.local`
2. Inicie o servidor de desenvolvimento: `pnpm dev`
3. Preencha o formulário na landing page
4. Verifique os logs no console do navegador
5. Verifique se a requisição foi enviada para a API 