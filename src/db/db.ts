import pg, { QueryResult, QueryResultRow } from 'pg';

const { Pool } = pg

export const pool = new Pool({ connectionString: process.env.DATABASE_URL})

export const query = async <T extends QueryResultRow>(text: string, params?: unknown[]): Promise<T[]> => {
  const client = await pool.connect()
  try {
    const res: QueryResult<T> = await client.query<T>(text, params)
    return res.rows
  } catch (err) {
    console.error('Erreur de requête:', err)
    throw err
  } finally {
    client.release()
  }
}