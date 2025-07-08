# NLW Agents - Backend

Este projeto é o backend do NLW Agents, desenvolvido durante um evento da Rocketseat. Ele é responsável por fornecer a API RESTful, gerenciar o banco de dados e aplicar regras de negócio.

## Principais bibliotecas utilizadas

- **Fastify**: Framework web rápido e eficiente para Node.js.
- **Drizzle ORM**: ORM moderno para manipulação de banco de dados relacional.
- **Postgres**: Banco de dados relacional utilizado.
- **Zod**: Validação de dados e schemas.
- **@fastify/cors**: Middleware para habilitar CORS.
- **fastify-type-provider-zod**: Integração de validação de tipos com Fastify.

## Estrutura de Pastas

- **src/server.ts**: Inicialização do servidor Fastify.
- **src/env.ts**: Configuração de variáveis de ambiente.
- **src/http/routes/**: Rotas HTTP da API (ex: `get-rooms.ts`).
- **src/db/connection.ts**: Configuração da conexão com o banco de dados.
- **src/db/schema/**: Schemas das tabelas do banco (`index.ts`, `questions.ts`, `rooms.ts`).
- **src/db/miagrations/**: Scripts de migração SQL e metadados.
- **src/db/seed.ts**: Script para popular o banco com dados iniciais.

## Padrões de Projeto

- API RESTful organizada por módulos.
- Separação entre lógica de rotas, validação e acesso a dados.
- Uso de migrations e seeds para versionamento e popular banco.
- Validação de dados com Zod para segurança e integridade.

## Exemplo de .env
```
# HTTP
PORT=3333

# Database
DATABASE_URL="postgressql://docker:docker@localhost:5432/agents"
```

## Setup

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

O backend será iniciado na porta configurada (por padrão, 3333).

---

## Observação

O NLW Agents foi desenvolvido durante um evento da Rocketseat, com foco em boas práticas de arquitetura, organização de código e uso de tecnologias modernas tanto no frontend quanto no backend.