# AgroShield

Decentralized parametric crop insurance platform built on the Fuel blockchain.

## Overview

AgroShield provides parametric crop insurance using smart contracts and automated weather data. Farmers can create policies, receive automatic payouts based on weather conditions, and track their coverage through a simple web interface.

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm
- Fuel toolchain (forc, fuel-core)

### Installation
```bash
# Install dependencies
pnpm install

# Build contracts
pnpm forc:build

# Start development environment
pnpm dev
```

### Development Commands

**Build & Development:**
```bash
pnpm build              # Build entire monorepo
pnpm dev                # Start development (excludes contracts)
pnpm --filter @agroshield/app dev       # Frontend only
pnpm --filter @agroshield/api-server dev # API server only
```

**Smart Contracts:**
```bash
pnpm forc:fmt           # Format Sway contracts
pnpm forc:build         # Build contracts
pnpm --filter @agroshield/app fuels:build  # Generate frontend bindings
pnpm --filter @agroshield/app fuels:deploy # Deploy contracts
```

**Code Quality:**
```bash
pnpm lint               # Lint all packages
pnpm test               # Run tests
```

**Database:**
```bash
pnpm db:up              # Start PostgreSQL in Docker
pnpm db:down            # Stop database
```

## Project Structure

```
├── apps/
│   ├── app/            # React frontend
│   ├── api-server/     # Fastify API server
│   └── indexer/        # Fuel blockchain indexer
├── packages/
│   ├── contracts/      # Sway smart contracts
│   ├── core-domain/    # Business logic
│   ├── data-access/    # Database & API clients
│   └── graphql-queries/ # GraphQL queries & hooks
```

## Architecture

- **Smart Contracts**: Sway contracts on Fuel blockchain for policy management
- **Frontend**: React app with Fuel wallet integration
- **Backend**: Fastify server with GraphQL endpoints
- **Indexer**: Processes blockchain events into PostgreSQL database
- **Domain Logic**: Clean architecture with separated business rules

## Features

- ✅ Create parametric crop insurance policies
- ✅ Automatic weather-based payouts
- ✅ Policy status tracking and claims history
- ✅ Wallet-based authentication
- 🚧 Weather data integration (in progress)
- 🚧 Advanced policy types (in progress)

## Tech Stack

- **Blockchain**: Fuel (Sway contracts)
- **Frontend**: React 19, Vite, TailwindCSS, Fuel React SDK
- **Backend**: Fastify, TypeScript, PostgreSQL
- **Tooling**: PNPM workspaces, Turborepo, Biome

---

*This is a development version. Features and documentation are subject to change.*
