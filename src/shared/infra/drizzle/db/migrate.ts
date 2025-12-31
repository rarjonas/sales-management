import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { logger } from '@/shared/infra/logger'
import { getDrizzleInstance } from './index'

async function main() {
  logger.info('Aplicando migrações...')

  try {
    const db = getDrizzleInstance()

    await migrate(db, {
      migrationsFolder: './src/shared/infra/drizzle/db/migrations',
    })

    logger.info('Migrações aplicadas com sucesso!')
    process.exit(0)
  } catch (error) {
    logger.error({ error }, 'Erro ao aplicar migrações')
    process.exit(1)
  }
}

main()
