import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const db = drizzle({
  connection: {
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
  },
});

export { db };
