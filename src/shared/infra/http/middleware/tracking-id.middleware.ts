import type { FastifyInstance, FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    trackingId?: string
  }
}

export async function setupTrackingId(app: FastifyInstance) {
  app.addHook('onRequest', async (request: FastifyRequest) => {
    const trackingId = request.id

    request.headers['x-tracking-id'] = trackingId
    request.trackingId = trackingId
  })
}
