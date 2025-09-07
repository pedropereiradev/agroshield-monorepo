import { relations } from 'drizzle-orm';
import {
  date,
  doublePrecision,
  integer,
  pgTable,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';
import { locationRegions } from './location-region-entity';

export const weatherData = pgTable('weather_data', {
  id: serial().primaryKey(),
  regionId: serial('region_id').references(() => locationRegions.id),
  date: date().notNull(),
  weatherCode: integer('weather_code'),
  temperatureMax: doublePrecision('temperature_max'),
  temperatureMin: doublePrecision('temperature_min'),
  precipitationSum: doublePrecision('precipitation_sum'),
  windSpeedMax: doublePrecision('wind_speed_max'),
  rainSum: doublePrecision('rain_sum'),
  snowfallSum: doublePrecision('snowfall_sum'),
  sunrise: timestamp('sunrise'),
  sunset: timestamp('sunset'),
  sunshineDuration: doublePrecision('sunshine_duration'),
  daylightDuration: doublePrecision('daylight_duration'),
  windGustsMax: doublePrecision('wind_gusts_max'),
  windDirectionDominant: doublePrecision('wind_direction_dominant'),
  shortwaveRadiationSum: doublePrecision('shortwave_radiation_sum'),
  et0FaoEvapotranspiration: doublePrecision('et0_fao_evapotranspiration'),
});

export const weatherDataRelations = relations(weatherData, ({ one }) => ({
  region: one(locationRegions, {
    fields: [weatherData.regionId],
    references: [locationRegions.id],
  }),
}));
