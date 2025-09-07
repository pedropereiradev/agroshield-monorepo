CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"region_id" serial NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations_regions" (
	"id" serial PRIMARY KEY NOT NULL,
	"master_latitude" double precision NOT NULL,
	"master_longitude" double precision NOT NULL,
	"radius_km" double precision DEFAULT 25 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weather_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"region_id" serial NOT NULL,
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
ALTER TABLE "weather_data" ADD CONSTRAINT "weather_data_region_id_locations_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."locations_regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "weather_data_day_idx" ON "weather_data" USING btree ("day");