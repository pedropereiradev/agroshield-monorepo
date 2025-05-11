```
classDiagram
direction TB

namespace Web3 {
%% ─── ON‑CHAIN CONTRACTS (PD‑1) ───────────────────
    class InsuranceNFT { <<contract>>
        +crop: String
        +region_x: u32
        +region_y: u32
        +insured_value: u64
        +premium: u64
        +policy_type: String
        +insured_area: u64
        +unit: String
        +start_date: u64
        +duration: u64
        +mint()
        +burn()
    }

    class InsuranceManager { <<contract>>
        -policies: StorageMap < u256, PolicyRecord>
        -owner_index: StorageMap < Address, Vec<u256>>
        +registerPolicy()
        +setStatus()
        +getPolicy()
        +listPolicies()
        +listPoliciesByOwner()
    }

    class InsuranceContract { <<contract>>
        -nft_id: ContractId
        -manager_id: ContractId
        -project_wallet: Address
        +purchasePolicy(params) payable
        +approveClaim()
        +denyClaim()
        +payOut()
    }

%% ─── OFF‑CHAIN INDEXER (PD‑1) ────────────────────
    class PolicyIndexer { <<off-chain>>
        +PolicyCreated()
        +StatusChanged()
        +Paid()
    }
}

namespace Indexer {
  class PolicyIndexer {
    <<service>>
    +handlePolicyCreated()
    +handleStatusChanged()
    +handlePaid()
  }

  class Policy {
    <<entity>>
    +id: u256
    +owner: Address
    +crop: String
    +insured_value: u64
    +premium: u64
    +status: String
    +start_date: datetime
    +end_date: datetime
  }

  class IndexerDB {
    <<repository>>
    +savePolicy(p)
    +updateStatus()
    +getPolicy()
    +listPolicies()
    +listPoliciesByOwner()
  }

  class GraphQLAPI {
    <<api>>
    +policies()
    +policiesByOwner()
  }
}


namespace PremiumPricing {
    class PremiumAPI {
    <<service>>
    +getQuote(): Quote
  }

  class PremiumCalculator {
    <<class>>
    +calculatePremium(): u128
    +calculatePayout(): u128
  }

  class Quote {
    <<entity>>
    +id: uuid
    +owner: Address
    +premium: u128
    +insured_value: u128
    +created_at: datetime
    +params: JSON
  }
}

namespace WeatherData {
    class WeatherRepository {
    <<repository>>
    +saveDailyData()
    +getHistorical()
  }

  class OpenWeatherClient {
    <<external>>
    +fetchCurrent()
    +fetchHistorical()
  }

  class WeatherETL {
    <<job>>
    +runDaily()
  }

  class WeatherRecord {
    <<entity>>
    +date: date
    +prcp_mm: float
    +tmax_c: float
    +tmin_c: float
  }

  class Location {
    <<valueObject>>
    +lat: float
    +lon: float
    +geohash: string
  }
}

InsuranceContract --> InsuranceNFT : mint
InsuranceContract --> InsuranceManager : register / setStatus

PremiumAPI --> PremiumCalculator : uses
PremiumAPI --> WeatherRepository : reads/writes
PremiumAPI --> Quote : creates
PremiumCalculator --> WeatherRepository : reads

WeatherRepository --> OpenWeatherClient : fetches
WeatherRepository *-- WeatherRecord
WeatherRepository *-- Location
WeatherETL --> OpenWeatherClient
WeatherETL --> WeatherRepository : save

PolicyIndexer --> Policy          : maps event → row
PolicyIndexer --> IndexerDB       : persist / update
GraphQLAPI --> IndexerDB          : read‑only queries

InsuranceContract ..> PolicyIndexer : emits events
```