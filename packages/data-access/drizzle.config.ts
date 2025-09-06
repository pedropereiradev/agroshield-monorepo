import { getDatabaseConfig } from '@agroshield/config';
import { defineConfig } from 'drizzle-kit';

const config = getDatabaseConfig();

export default defineConfig({
  out: './src/db/drizzle',
  schema: './src/entities/*-entity.ts',
  dialect: 'postgresql',
  dbCredentials: {
    database: config.name,
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    ssl: false,
  },
});
