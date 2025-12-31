import { defineConfig } from 'drizzle-kit'
import { env } from './src/shared/config/env'

export default defineConfig({
  out: './src/shared/infra/drizzle/db/migrations',
  schema: './src/shared/infra/drizzle/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
