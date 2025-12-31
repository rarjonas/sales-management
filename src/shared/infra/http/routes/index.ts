import type { FastifyInstance } from 'fastify'
import { setupModulesRoutes } from './modules.routes'

export async function setupRoutes(app: FastifyInstance) {
  await setupModulesRoutes(app)
}
