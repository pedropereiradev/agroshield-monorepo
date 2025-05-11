# ADR 005 – Choice of Fastify for HTTP API
Date: 2025‑05‑11  

## Context
We need a production‑grade Node framework with:
* TypeScript typings
* high throughput (JSON heavy)
* easy plugin system (indexer webhook)

## Decision
Adopt **Fastify** with these plugins:
* `@fastify/sensible` – error handling

## Consequences
* ~2× throughput of Express in benchmarks; low overhead.  
* Built‑in typed schema validation reduces input bugs.  
