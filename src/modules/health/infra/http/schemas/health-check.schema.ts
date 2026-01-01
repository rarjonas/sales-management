import { z } from 'zod'

/**
 * Schema Zod para validação da resposta do Health Check
 */
export const healthCheckResponseSchema = z.object({
  message: z.string(),
  status: z.string(),
  timestamp: z.string(),
})

/**
 * Schema Fastify para documentação e validação da rota
 */
export const healthCheckRouteSchema = {
  summary: 'Health check',
  description: 'Check the health of the API',
  tags: ['Health'],
  response: {
    200: healthCheckResponseSchema,
  },
}
