# ADR 004 – Weather Data Strategy: OpenWeather + Timescale ETL
Date: 2025‑05‑11  

## Context
Premium calculation requires many years of historical daily rainfall & temperature plus daily updates for active policies.

## Decision
* Use **OpenWeather One Call 3.0** as data source.  
* Create `weather_daily` hypertable in **TimescaleDB**:  
  `(location_id, date, prcp_mm, tmax_c, tmin_c, source)`.  
* Run **node‑cron** ETL (`jobs-weather-etl`) that:
  1. SELECTs distinct `(lat,lon)` from active policies.  
  2. Fetches today’s snapshot.  
  3. UPSERTs into `weather_daily`.
* Cache historical fetches; back‑fill runs once per location.

## Consequences
* Premium quotes need zero external API calls if cache warm.  
* OpenWeather free tier limits respected.
* Keep the queries inside the budget.  
