import { config } from '../config/index.js'; 
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const { Pool } = pg;

const pool = new Pool({
  connectionString: config.database.url,
  ssl: {
    rejectUnauthorized: false,
  },
});

const db = drizzle(pool);

export default db;
