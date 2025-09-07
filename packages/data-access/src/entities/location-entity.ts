import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  pgTable,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';
import { locationRegions } from './location-region-entity';

export const locations = pgTable('locations', {
  id: serial().primaryKey(),
  regionId: serial('region_id'),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const locationsRelations = relations(locations, ({ one }) => ({
  region: one(locationRegions, {
    fields: [locations.regionId],
    references: [locationRegions.id],
  }),
}));
