import { relations } from 'drizzle-orm';
import { doublePrecision, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { weatherData } from './weather-data-entity';

export const locations = pgTable('locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  weatherData: many(weatherData),
}));
