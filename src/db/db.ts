import pg, { QueryResult } from 'pg';

const { Pool } = pg

export const pool = new Pool({ connectionString: process.env.DATABASE_URL})

export const query = async <T = any>(text: string, params?: any[]): Promise<T[]> => {
  const client = await pool.connect();
  try {
    const res: QueryResult<T> = await client.query<T>(text, params);
    return res.rows; // rows est bien `T[]`
  } catch (err) {
    console.error('Erreur de requête:', err);
    throw err;
  } finally {
    client.release();
  }
};