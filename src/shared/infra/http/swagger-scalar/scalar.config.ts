import ScalarApiReference from '@scalar/fastify-api-reference'
import type { FastifyInstance } from 'fastify'

export async function setupScalar(app: FastifyInstance) {
  // Scalar API Reference (deve ser registrado depois das rotas)
  await app.register(ScalarApiReference, {
    routePrefix: '/reference',
  })
}
