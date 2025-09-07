ALTER TABLE "weather_data" RENAME COLUMN "day" TO "date";--> statement-breakpoint
ALTER TABLE "weather_data" RENAME COLUMN "temperature_2m_max" TO "temperature_max";--> statement-breakpoint
ALTER TABLE "weather_data" RENAME COLUMN "temperature_2m_min" TO "temperature_min";--> statement-breakpoint
ALTER TABLE "weather_data" RENAME COLUMN "wind_speed_10m_max" TO "wind_speed_max";--> statement-breakpoint
ALTER TABLE "weather_data" RENAME COLUMN "wind_gusts_10m_max" TO "wind_gusts_max";--> statement-breakpoint
DROP INDEX "weather_data_day_idx";--> statement-breakpoint
ALTER TABLE "weather_data" DROP CONSTRAINT "weather_data_pk";--> statement-breakpoint
ALTER TABLE "weather_data" ADD COLUMN "rain_sum" double precision;--> statement-breakpoint
ALTER TABLE "weather_data" ADD COLUMN "snowfall_sum" double precision;--> statement-breakpoint
ALTER TABLE "weather_data" ADD COLUMN "sunrise" double precision;--> statement-breakpoint
ALTER TABLE "weather_data" ADD COLUMN "sunset" double precision;--> statement-breakpoint
ALTER TABLE "weather_data" ADD COLUMN "sunshine_duration" double precision;--> statement-breakpoint
ALTER TABLE "weather_data" ADD COLUMN "daylight_duration" double precision;--> statement-breakpoint
ALTER TABLE "weather_data" ADD COLUMN "wind_direction_dominant" double precision;--> statement-breakpoint
ALTER TABLE "weather_data" DROP COLUMN "precipitation_hours";