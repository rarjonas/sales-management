import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const CategoriesTable = pgTable(
  'categories',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    slug: varchar('slug', { length: 100 }).unique().notNull(),
    active: boolean('active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('idx_slug').on(table.slug),
    index('idx_active').on(table.active),
    index('idx_created_at').on(table.createdAt),
  ],
)

// Export types for each table
export type Category = InferSelectModel<typeof CategoriesTable>
export type CategoryInsert = InferInsertModel<typeof CategoriesTable>
