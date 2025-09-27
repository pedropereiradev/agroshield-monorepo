import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { quotes } from './quote-entity';

export const customers = pgTable('customer', {
  id: serial().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text().notNull(),
  telephone: text().notNull(),
  walletAddress: text('wallet_address'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});

export const customerRelations = relations(customers, ({ many }) => ({
  quotes: many(quotes),
}));
