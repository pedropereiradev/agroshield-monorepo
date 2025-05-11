# AgroShield Monorepo – Package Overview (Slim Edition)

> **Workspace:** pnpm + Turborepo  |  **Runtime:** Node 20

---

## 📦 `@agro/core-domain`

| Item                | Details                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Goal**            | Hold **pure business logic and types**—no DB, no HTTP, zero side‑effects.                                                                        |
| **Sub‑modules**     | `policy/` (state machine & ID derivation) · `premium/` (actuarial math) · `weather/` (stats helpers).                                            |
| **Public API**      | `ts import { PolicyStatus, validateTransition } from '@agro/core-domain/policy'; import { calculatePremium } from '@agro/core-domain/premium'; ` |
| **No runtime deps** |  Runs in Vitest < 50 ms.                                                                                                                         |
| **Build script**    | `pnpm --filter @agro/core-domain build` (tsup).                                                                                                  |

---

## 📦 `@agro/data-access`

| Item                 | Details                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Goal**             | Provide **infrastructure adapters** (Postgres/Timescale **&** OpenWeather) behind type‑safe repositories and clients. |
| **Key folders**      | `db/` (Drizzle models & migrations) · `weather/` (OpenWeather client + cache)                                         |
| **Public API**       | `PolicyRepo`, `QuoteRepo`, `WeatherRepo`, `fetchCurrent()`                                                            |
| **Env vars**         | `DATABASE_URL` · `OPENWEATHER_API_KEY` · optional `OW_RATE_LIMIT=60`                                                  |
| **Local migrations** | `pnpm --filter @agro/data-access drizzle-kit push`                                                                    |
| **Test strategy**    | Use Docker‑Compose Postgres in CI; mock external HTTP with `nock`.                                                    |

---

## 📦 `@agro/api-server`

| Item              | Details                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Goal**          | All **always‑on HTTP** responsibilities: REST/GraphQL for dApp + Admin, plus webhook endpoint for Fuel Indexer events. |
| **Stack**         | Fastify v4 · Zod schemas · Drizzle repositories.                                                                       |
| **Routes**        | `GET /api/quote` · `GET /api/policy/:id` · `POST /indexer/event`                                                       |
| **Plugins**       | `indexerHookPlugin` (validates & persists events) · sensible error handler · optional JWT auth.                        |
| **Dev start**     | `pnpm --filter @agro/api-server dev` (`ts-node-dev`).                                                                  |
| **Prod build**    | `pnpm --filter @agro/api-server build` → `node dist/index.js`.                                                         |
| **Docker target** | `api` stage in root `Dockerfile`.                                                                                      |

---

## 📦 `@agro/jobs`

| Item                | Details                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **Goal**            | House **scheduled/batch code**—initially the daily weather ETL, later oracle reports.       |
| **Entry points**    | `runDaily.ts` (invoked by node‑cron *or* as Kubernetes CronJob CMD).                        |
| **Dependencies**    | `@agro/data-access` for DB + OpenWeather.                                                   |
| **Cron expression** | Defaults to `5 0 * * *` (00:05 UTC); override via `CRON_EXPRESSION`.                        |
| **Local run**       | `pnpm --filter @agro/jobs start` (executes job once).                                       |
| **Docker target**   | `etl` stage in root `Dockerfile`—deploy as separate container or schedule with ECS/Fargate. |

---

## 🔄 Package Relationships

```mermaid
graph LR
  A[@agro/core-domain] --> B[@agro/data-access]
  B --> C[@agro/api-server]
  B --> D[@agro/jobs]
  A -. type imports .-> C
  A -. type imports .-> D
```

*`core-domain` stays pure; infra packages never import adapters from each other.*

---

## 🛠 Shared Scripts

| Command                              | What it does                                         |
| ------------------------------------ | ---------------------------------------------------- |
| `pnpm turbo run build`               | Builds all four packages in dependency order (tsup). |
| `pnpm turbo run test`                | Runs Vitest across packages; caches results.         |
| `pnpm turbo run lint`                | Lints with Biome/ESLint.                             |
| `pnpm --filter @agro/api-server dev` | Hot‑reload API.                                      |
| `pnpm --filter @agro/jobs start`     | Executes ETL job once (useful for local).            |

---

## 🚀 Deployment Targets

| Container    | Package entry              | Purpose                              |
| ------------ | -------------------------- | ------------------------------------ |
| **agro-api** | `api-server/dist/index.js` | Always‑on JSON API & indexer webhook |
| **agro-etl** | `jobs/dist/runDaily.js`    | Daily weather sync (CronJob)         |
| **indexer**  | Rust Fuel Indexer binary   | On‑chain → DB event pipeline         |
| **postgres** | TimescaleDB                | Shared storage                       |

---

## 🤝 Contribution Tips

1. **Touch core logic first** – try to keep calculations in `core-domain` so they are testable without DB/net.
2. **Add migrations next** – update `data-access/db/*` and run `drizzle-kit push`.
3. **Expose via API** – only after logic and data are solid, wire Fastify routes.
4. **Document env vars** – update `.env.example` whenever a package needs a new secret or config.
5. **Commit using Conventional Commits** – enables semantic‑release later if we publish libs.

---

*Happy coding! Ping the maintainers in `#agroshield-dev` Slack for questions or PR reviews.*
