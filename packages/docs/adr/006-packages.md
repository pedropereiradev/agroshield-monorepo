# ADR 006 – Slimming Off‑Chain Code to Four Packages
Date: 2025‑05‑11  

## Context
Create the packages to have a good structure for the project

## Decision
Collapse the off‑chain codebase into **four** packages:

| New Package           | Contents                                                     |
|-----------------------|--------------------------------------------------------------|
| `@agro/core-domain`   | All pure business logic & shared types (policy, premium, weather). |
| `@agro/data-access`   | Postgres/Timescale repositories **and** OpenWeather adapter. |
| `@agro/api-server`    | Fastify HTTP server & Fuel‑Indexer webhook plugin.           |
| `@agro/jobs`          | Scheduled tasks (daily weather ETL, future oracle reporter). |

Rules:

1. `core-domain` has **zero runtime dependencies**; imports flow outward only.
2. `data-access` is the **sole owner** of persistence and external APIs.
3. Runtime containers: `api-server` (always‑on) and `jobs` (cron) built from the same repo.
4. Turborepo graph: `core-domain → data-access → {api-server, jobs}`.

## Consequences
### Positive
* **Simpler CI** – four build targets vs. eight; ~40 % faster pipeline.
* **Lower boilerplate** – fewer `tsconfig.json`, `package.json`, and migration folders.
* **Quick onboarding** – new contributors see clear boundaries without micro‑service overhead.
* **Future‑proof** – packages can still be promoted to standalone services in PD‑2 without refactor.

### Negative / Trade‑offs
* Some package directories now contain mixed concerns (DB + HTTP client) that would otherwise be separate.
* Release cadence is coupled: a change in OpenWeather adapter triggers `data-access` build even if only Postgres code changed (mitigated by Turborepo caching).

### Rejected Alternatives
* **One package for all logic** - A lot of things in same place.
* **True micro‑services from day 1** – unnecessary infra expense; slows TCC delivery.
