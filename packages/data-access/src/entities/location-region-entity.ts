import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  pgTable,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';
import { locations } from './location-entity';
import { weatherData } from './weather-data-entity';

export const locationRegions = pgTable('locations_regions', {
  id: serial().primaryKey(),
  masterLatitude: doublePrecision('master_latitude').notNull(),
  masterLongitude: doublePrecision('master_longitude').notNull(),
  radiusKm: doublePrecision('radius_km').notNull().default(25),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const locationRegionsRelations = relations(
  locationRegions,
  ({ many }) => ({
    locations: many(locations),
    weatherData: many(weatherData),
  })
);
