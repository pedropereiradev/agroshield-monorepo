```
flowchart LR
  %% ─── actors ─────────────────────────────
  Farmer([👨‍🌾 Agricultor])
  Admin([🛠️ Administrador])

  %% ─── system boundary ────────────────────
  subgraph AgroShield_PD1_System["AgroShield - Diagrama de casos de uso"]
    direction TB
    purchase((Comprar apolice))
    viewStatus((Visualizar status da apolice))
    submitClaim((Submeter resgate))
    approveClaim((Aprovar resgate))
    denyClaim((Rejeitar resgate))
    payOut((Pagamento))
    withdraw((Retirar fundos))
  end

  %% ─── relationships ──────────────────────
  Farmer --> purchase
  Farmer --> viewStatus
  Farmer --> submitClaim

  Admin --> approveClaim
  Admin --> denyClaim
  Admin --> payOut
  Admin --> withdraw
  Admin --> viewStatus

  %% optional semantic link
  payOut -. includes .-> approveClaim
```