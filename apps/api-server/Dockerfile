FROM node:22-alpine AS base

RUN npm install -g pnpm@10.6.3

WORKDIR /app

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api-server/package.json ./apps/api-server/
COPY packages/core-domain/package.json ./packages/core-domain/
COPY packages/data-access/package.json ./packages/data-access/
COPY packages/config/package.json ./packages/config/

RUN pnpm install --frozen-lockfile

COPY packages/core-domain ./packages/core-domain
COPY packages/data-access ./packages/data-access
COPY packages/config/package.json ./packages/config/
COPY apps/api-server ./apps/api-server

RUN pnpm turbo run build --filter='./packages/*'
RUN pnpm --filter @agroshield/api-server build


FROM node:22-alpine AS production

RUN npm install -g pnpm@10.6.3

WORKDIR /app

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./
COPY apps/api-server/package.json ./apps/api-server/
COPY packages/core-domain/package.json ./packages/core-domain/
COPY packages/data-access/package.json ./packages/data-access/
COPY packages/config/package.json ./packages/config/

RUN pnpm install --frozen-lockfile --prod

COPY --from=base /app/packages/core-domain/dist ./packages/core-domain/dist
COPY --from=base /app/packages/data-access/dist ./packages/data-access/dist
COPY --from=base /app/packages/config/dist ./packages/config/dist
COPY --from=base /app/packages/data-access/drizzle.config.ts ./packages/data-access/drizzle.config.ts
COPY --from=base /app/apps/api-server/dist ./apps/api-server/dist

COPY --from=base /app/packages/core-domain/package.json ./packages/core-domain/
COPY --from=base /app/packages/data-access/package.json ./packages/data-access/
COPY --from=base /app/packages/config/package.json ./packages/config/
COPY --from=base /app/apps/api-server/package.json ./apps/api-server/

EXPOSE 3000

WORKDIR /app/apps/api-server

CMD ["pnpm", "--filter", "@agroshield/api-server", "start"]
