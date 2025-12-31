import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from '@/shared/config/env'
import { DatabaseConnectionException } from '@/shared/core/exceptions/database.exception'
import { logger } from '@/shared/infra/logger'
import * as schema from './schema'

const createPool = (databaseUrl: string) => {
  if (!databaseUrl) {
    throw new DatabaseConnectionException('DATABASE_URL não está definida')
  }

  try {
    return new Pool({
      connectionString: databaseUrl,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 10,
    })
  } catch (error) {
    logger.error({ error }, 'Erro ao criar pool de conexões')
    throw new DatabaseConnectionException(
      'Falha ao criar pool de conexões com o banco de dados',
      error,
    )
  }
}

let drizzleInstance: NodePgDatabase<typeof schema> | null = null
let poolInstance: Pool | null = null

const getPool = (): Pool => {
  if (!poolInstance) {
    poolInstance = createPool(env.DATABASE_URL)
  }
  return poolInstance
}

export const getDrizzleInstance = (): NodePgDatabase<typeof schema> => {
  if (!drizzleInstance) {
    const pool = getPool()
    drizzleInstance = drizzle(pool, { schema })
  }
  return drizzleInstance
}

export const db = getDrizzleInstance()

export type Database = NodePgDatabase<typeof schema>

/**
 * Inicializa e testa a conexão com o banco de dados
 * @throws {DatabaseConnectionException}
 */
export async function initializeDatabase(): Promise<void> {
  try {
    const pool = getPool()
    const client = await pool.connect()
    try {
      await client.query('SELECT 1')
      logger.info('Conexão com o banco de dados estabelecida com sucesso')
    } finally {
      client.release()
    }
  } catch (error) {
    logger.error({ error }, 'Erro ao conectar ao banco de dados')
    throw new DatabaseConnectionException(
      'Falha ao conectar ao banco de dados',
      error,
    )
  }
}
