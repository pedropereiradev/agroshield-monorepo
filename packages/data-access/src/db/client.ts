import { getDatabaseConfig } from '@agroshield/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const config = getDatabaseConfig();

const db = drizzle({
  connection: {
    database: config.name,
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
  },
});

export { db };
