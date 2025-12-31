import { logger } from '@/shared/infra/logger'
import { getDrizzleInstance } from './index'
import { CategoriesTable } from './schema'

async function seed() {
  logger.info('Iniciando seed do banco de dados...')

  try {
    const db = getDrizzleInstance()

    const [category1] = await db
      .insert(CategoriesTable)
      .values({
        name: 'Plantas',
        description: 'Plantas de interior e exterior',
        slug: 'plantas',
        active: true,
      })
      .returning()

    logger.info({ category: category1 }, 'Categoria criada')

    const [category2] = await db
      .insert(CategoriesTable)
      .values({
        name: 'Vasos',
        description: 'Vasos para plantas',
        slug: 'vasos',
        active: true,
      })
      .returning()

    logger.info({ category: category2 }, 'Categoria criada')

    logger.info('Seed concluído com sucesso!')
    process.exit(0)
  } catch (error) {
    logger.error({ error }, 'Erro ao executar seed')
    process.exit(1)
  }
}

seed()
