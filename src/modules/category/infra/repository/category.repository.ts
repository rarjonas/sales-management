import type { InferSelectModel } from 'drizzle-orm'
import { getDrizzleInstance } from '@/shared/infra/drizzle/db'
import {
  CategoriesTable,
  type Category,
} from '@/shared/infra/drizzle/db/schema'
import { DrizzleDefaultRepository } from '@/shared/infra/drizzle/repository/drizzle.repository'

/**
 * Repository específico para Category
 * Estende DrizzleDefaultRepository para usar os métodos compartilhados
 */
export class CategoryRepository extends DrizzleDefaultRepository<
  typeof CategoriesTable,
  Category
> {
  constructor() {
    super(getDrizzleInstance(), CategoriesTable)
  }

  /**
   * Mapeia o resultado do banco para o modelo Category
   */
  protected mapToModel(
    data: InferSelectModel<typeof CategoriesTable>,
  ): Category {
    return data as Category
  }
}
