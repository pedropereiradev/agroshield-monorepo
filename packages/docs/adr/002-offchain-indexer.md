# ADR 002 – Off‑Chain Indexer for Policy Queries
Date: 2025‑05‑11  

## Context
Listing “all policies” or “all policies by owner” on‑chain would require unbounded loops and incurring high gas.

## Decision
* Deploy a **Fuel Indexer** instance (self‑hosted) that listens to `PolicyCreated`, `StatusChanged`, and `Paid` events.
* Map events to a `policy` table in Postgres with columns:  
  `id`, `owner`, `crop`, `insured_value`, `premium`, `status`, `start_date`, `end_date`.
* Expose a GraphQL API (`policies`, `policiesByOwner`) consumed by dApp & Admin.

## Consequences
* Queries are O(1) off‑chain; no gas spent by users.  
* Additional infra (Postgres + indexer container) required.  
* On‑chain remains single source of truth; indexer rows are soft‑fork‑safe (can re‑sync).
