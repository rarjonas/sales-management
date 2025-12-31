import type { FastifyInstance } from 'fastify'
import { setupCors } from './cors.middleware'
import { setupHelmet } from './helmet.middleware'
import { setupTrackingId } from './tracking-id.middleware'

export async function setupMiddlewares(app: FastifyInstance) {
  await setupHelmet(app)
  await setupCors(app)
  await setupTrackingId(app)
}
