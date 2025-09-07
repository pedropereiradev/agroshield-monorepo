ALTER TABLE "weather_data" DROP COLUMN IF EXISTS "sunrise";
ALTER TABLE "weather_data" DROP COLUMN IF EXISTS "sunset";

ALTER TABLE "weather_data" ADD COLUMN "sunrise" timestamp;
ALTER TABLE "weather_data" ADD COLUMN "sunset" timestamp;
