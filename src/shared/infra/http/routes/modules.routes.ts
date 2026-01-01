import type { FastifyInstance } from 'fastify'

import CategoryModule from '@/modules/category/category.module'
import HealthModule from '@/modules/health/health.module'

/**
 * Registra as rotas de todos os módulos
 * Cada módulo deve exportar uma função que recebe FastifyInstance e registra suas rotas
 */
export async function setupModulesRoutes(app: FastifyInstance) {
  await app.register(HealthModule)
  await app.register(CategoryModule)
}
