import type { FastifyInstance } from 'fastify'
import { setupScalar } from './scalar.config'
import { setupSwagger } from './swagger.config'

export async function setupDocs(app: FastifyInstance) {
  await setupSwagger(app)
}

export async function setupScalarDocs(app: FastifyInstance) {
  await setupScalar(app)
}
