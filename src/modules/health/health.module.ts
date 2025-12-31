import type { FastifyInstance } from 'fastify'
import { HealthCheckUseCase } from './core/use-cases/health-check.use-case'
import HealthController from './infra/http/controllers/health.controller'
import HealthRoutes from './infra/http/routes/health.routes'

declare module 'fastify' {
  interface FastifyInstance {
    healthCheckUseCase: HealthCheckUseCase
    healthController: typeof HealthController
  }
}

/**
 * Health Module - Arquitetura Hexagonal
 * Orquestra a inicialização do módulo Health
 * - Registra Use Cases (Core/Domain)
 * - Registra Controllers (Infrastructure/Adapters)
 * - Registra Routes (Infrastructure/Adapters)
 */
export default async function HealthModule(app: FastifyInstance) {
  // Injeção de dependências via app.decorate
  const healthCheckUseCase = new HealthCheckUseCase()
  app.decorate('healthCheckUseCase', healthCheckUseCase)
  app.decorate('healthController', HealthController)

  // Registra as rotas HTTP
  await app.register(HealthRoutes)
}

// Export use cases used by other modules
export { HealthCheckUseCase }
