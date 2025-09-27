import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { customers } from './customer-entity';
import { weatherData } from './weather-data-entity';

export const quotes = pgTable('quotes', {
  id: serial().primaryKey(),
  customerId: serial('customer_id'),
  weatherDataId: serial('weather_data_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});

export const quotesRelation = relations(quotes, ({ one }) => ({
  customer: one(customers, {
    fields: [quotes.customerId],
    references: [customers.id],
  }),
  weatherData: one(weatherData, {
    fields: [quotes.weatherDataId],
    references: [weatherData.id],
  }),
}));
