CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weather_data" (
	"id" uuid DEFAULT gen_random_uuid(),
	"location_id" uuid NOT NULL,
	"day" date NOT NULL,
	"precipitation_sum" double precision,
	"precipitation_hours" integer,
	"temperature_2m_max" double precision,
	"temperature_2m_min" double precision,
	"wind_speed_10m_max" double precision,
	"wind_gusts_10m_max" double precision,
	"weather_code" integer,
	"shortwave_radiation_sum" double precision,
	"et0_fao_evapotranspiration" double precision,
	CONSTRAINT "weather_data_pk" PRIMARY KEY("id","day")
);
--> statement-breakpoint
ALTER TABLE "weather_data" 
	ADD CONSTRAINT "weather_data_location_id_locations_id_fk" 
	FOREIGN KEY ("location_id") 
	REFERENCES "public"."locations"("id") 
	ON DELETE no action 
	ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "weather_data_day_idx" 
	ON "weather_data" USING btree ("day");
--> statement-breakpoint
SELECT create_hypertable(
  'weather_data',
  'day',
  if_not_exists => TRUE
);
--> statement-breakpoint
ALTER TABLE weather_data
  SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'location_id'
  );
--> statement-breakpoint
SELECT add_compression_policy(
  'weather_data',
  INTERVAL '30 days'
);