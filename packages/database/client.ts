import { Pool, type PoolConfig } from 'pg';
import { env } from '@shipforge/config';

const poolConfig: PoolConfig = {
  connectionString: env.DATABASE_URL,
};

export const db: Pool = new Pool(poolConfig);

db.on('error', (err: Error) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
});

export const pool = db;
export { Pool, type PoolConfig } from 'pg';
export default db;
