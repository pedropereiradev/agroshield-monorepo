import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/drizzle',
  schema: './src/entities/*-entity.ts',
  dialect: 'postgresql',
  dbCredentials: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    ssl: false,
  },
});
