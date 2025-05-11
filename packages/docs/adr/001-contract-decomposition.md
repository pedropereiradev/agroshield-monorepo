# ADR 001 – Contract Decomposition: InsuranceNFT, InsuranceManager, InsuranceContract
Date: 2025‑05‑11  

## Context
A single Sway contract could store immutable metadata, mutable status, and funds, but that would
* increase coupling,
* hinder upgradability,
* and load one storage trie with mixed‑concern items.

## Decision
We separate concerns into three contracts deployed to Fuel:

| Contract            | Responsibility |
|---------------------|----------------|
| **InsuranceNFT**    | Own immutable policy metadata as an SRC‑20 + SRC‑7 NFT. |
| **InsuranceManager**| Store mutable state (`status`, `observations`, owner index) in a `StorageMap`. |
| **InsuranceContract** | Orchestrate minting, register in manager, hold premium funds, emit events. |

Only `InsuranceContract` has write access to the other two.

## Consequences
* **SRP** – each contract has one reason to change.  
* **Gas** – writes stay O(1); immutable reads are cheap `view` calls.  
