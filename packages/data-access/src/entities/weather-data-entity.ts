import { relations } from 'drizzle-orm';
import {
  date,
  doublePrecision,
  index,
  integer,
  pgTable,
  primaryKey,
  uuid,
} from 'drizzle-orm/pg-core';
import { locations } from './location-entity';

export const weatherData = pgTable(
  'weather_data',
  {
    id: uuid('id').defaultRandom(),
    locationId: uuid('location_id')
      .notNull()
      .references(() => locations.id),
    day: date('day').notNull(),
    precipitationSum: doublePrecision('precipitation_sum'),
    precipitationHours: integer('precipitation_hours'),
    temp2mMax: doublePrecision('temperature_2m_max'),
    temp2mMin: doublePrecision('temperature_2m_min'),
    windSpeed10mMax: doublePrecision('wind_speed_10m_max'),
    windGusts10mMax: doublePrecision('wind_gusts_10m_max'),
    weatherCode: integer('weather_code'),
    shortwaveRadiation: doublePrecision('shortwave_radiation_sum'),
    et0Fao: doublePrecision('et0_fao_evapotranspiration'),
  },
  (table) => [
    primaryKey({ name: 'weather_data_pk', columns: [table.id, table.day] }),
    index('weather_data_day_idx').on(table.day),
  ]
);

export const weatherDataRelations = relations(weatherData, ({ one }) => ({
  location: one(locations, {
    fields: [weatherData.locationId],
    references: [locations.id],
  }),
}));
