import { z } from 'zod'

/**
 * Schemas Zod para validação das respostas
 */

export const categoryResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  active: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const categoryListAllResponseSchema = z.object({
  data: z.array(categoryResponseSchema),
  metadata: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
})

/**
 * Schemas Zod para validação de parâmetros e query
 */

export const categoryGetByIdParamsSchema = z.object({
  id: z.string().uuid().describe('Category ID'),
})

export const categoryListAllQuerystringSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .optional()
    .default(1)
    .describe('Page number'),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .optional()
    .default(10)
    .describe('Items per page'),
})

/**
 * Schemas Fastify para documentação e validação das rotas
 */

export const categoryGetByIdRouteSchema = {
  summary: 'Get a category by ID',
  description: 'Get a category by ID',
  tags: ['Category'],
  params: categoryGetByIdParamsSchema,
  response: {
    200: categoryResponseSchema,
  },
}

export const categoryListAllRouteSchema = {
  summary: 'List all categories',
  description: 'List all categories with pagination',
  tags: ['Category'],
  querystring: categoryListAllQuerystringSchema,
  response: {
    200: categoryListAllResponseSchema,
  },
}
