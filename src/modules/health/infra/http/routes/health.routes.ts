import type { FastifyInstance } from 'fastify'
import HealthController from '../controllers/health.controller'
import { healthCheckRouteSchema } from '../schemas/health-check.schema'

declare module 'fastify' {
  interface FastifyInstance {
    healthController: typeof HealthController
  }
}

export default async function HealthRoutes(app: FastifyInstance) {
  app.get('/health', {
    schema: healthCheckRouteSchema,
    handler: HealthController.getHealthStatus,
  })
}
