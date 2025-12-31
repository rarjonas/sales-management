import {
  eq,
  type InferInsertModel,
  type InferSelectModel,
  sql,
} from 'drizzle-orm'
import type { AnyPgColumn, AnyPgTable } from 'drizzle-orm/pg-core'
import { DatabaseQueryException } from '@/shared/core/exceptions/database.exception'
import type { Database } from '../db'
import { handleDatabaseError } from '../db/error-handler'

export interface PaginatedResult<T> {
  items: T[]
  metadata: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export abstract class DrizzleDefaultRepository<
  TTable extends AnyPgTable & { id: AnyPgColumn },
  TModel = InferSelectModel<TTable>,
> {
  constructor(
    protected readonly db: Database,
    protected readonly table: TTable,
  ) {}

  /**
   * Create a new record in the database.
   * @param data - The data to insert into the database.
   * @returns Promise with the created model or null
   */
  async create(data: InferInsertModel<TTable>): Promise<TModel | null> {
    try {
      const result = await this.db
        .insert(this.table)
        .values(data as InferInsertModel<TTable>)
        .returning()

      if (!Array.isArray(result) || result.length === 0) {
        throw new DatabaseQueryException(
          'Nenhum dado retornado após a inserção',
          undefined,
          new Error('Empty result from insert'),
        )
      }

      return this.mapToModel(result[0] as InferSelectModel<TTable>)
    } catch (err) {
      return handleDatabaseError(err, 'create')
    }
  }

  /**
   * Find all records in the database with pagination.
   * @param page - The page number (starting from 1).
   * @param limit - The number of records per page.
   * @returns An array of models mapped from the database rows.
   */
  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResult<TModel>> {
    try {
      const offset = (page - 1) * limit

      const [{ count }] = await this.db
        .select({ count: sql<number>`count(*)`.as('count') })
        // @ts-expect-error - Drizzle type system limitation with generics
        .from(this.table)
        .execute()

      const data = await this.db
        .select()
        // @ts-expect-error - Drizzle type system limitation with generics
        .from(this.table)
        .limit(limit)
        .offset(offset)
        .execute()

      const totalPages = Math.ceil(Number(count) / limit)

      return {
        items: data.map((row) =>
          this.mapToModel(row as InferSelectModel<TTable>),
        ),
        metadata: {
          total: Number(count),
          page,
          limit,
          totalPages,
        },
      }
    } catch (err) {
      return handleDatabaseError(err, 'findAll')
    }
  }

  /**
   * Find a record by its ID.
   * @param id - The ID of the record to find.
   * @returns The found record or null if not found.
   */
  async findById(id: string): Promise<TModel | null> {
    try {
      const data = await this.db
        .select()
        // @ts-expect-error - Drizzle type system limitation with generics
        .from(this.table)
        .where(eq(this.table.id, id))
        .execute()
      return data.length > 0
        ? this.mapToModel(data[0] as InferSelectModel<TTable>)
        : null
    } catch (err) {
      return handleDatabaseError(err, 'findById')
    }
  }

  /**
   * Maps the database row to the model instance.
   * @param data - The raw database row data.
   * @returns The mapped model instance.
   */
  protected abstract mapToModel(data: InferSelectModel<TTable>): TModel
}
