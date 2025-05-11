# ADR 003 – Modular Monolith in Node.js + Turborepo
Date: 2025‑05‑11  

## Context
We need to ship quickly for PD‑1 but also like to learn about modular monolith applications.

## Decision
* Keep **one** deployable API container and **one** ETL job container.  
* Implement **domain / infra / adapter** separation as individual **pnpm workspace packages**:
  `domain-*`, `infra-*`, `api-http`, `jobs-weather-etl`, etc.
* Manage build via **Turborepo**.  

## Consequences
* Single deployment pipeline now; easy vertical split later.  
* CI builds are parallelized; package boundaries enforced by TypeScript project references.  
* Runtime footprints remain small (one Node process per container).
* Depencies versioning simplified
* Shared types simplified
