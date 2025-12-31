import { fastifySwagger } from '@fastify/swagger'
import type { FastifyInstance } from 'fastify'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export async function setupSwagger(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Sales Management API',
        description: 'API for the Sales Management System',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })
}
