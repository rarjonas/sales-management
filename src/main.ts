import { randomUUID } from 'node:crypto'
import type { IncomingMessage } from 'node:http'
import fastify, { type LogLevel } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from '@/shared/config/env'
import { setupMiddlewares } from '@/shared/infra/http/middleware'
import { setupRoutes } from '@/shared/infra/http/routes'
import { setupDocs, setupScalarDocs } from '@/shared/infra/http/swagger-scalar'

const app = fastify({
  logger: {
    level: (env.LOG_LEVEL as LogLevel) || 'info',
  },
  genReqId: (req: IncomingMessage) => {
    const trackingId = (req.headers['x-tracking-id'] as string) || randomUUID()
    return trackingId
  },
}).withTypeProvider<ZodTypeProvider>()

async function start() {
  await setupMiddlewares(app)

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  await setupDocs(app)
  await setupRoutes(app)
  await setupScalarDocs(app)

  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' })
    app.log.info(`API documentation: http://localhost:${env.PORT}/reference`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
