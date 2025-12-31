import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { HealthCheckUseCase } from '../../../core/use-cases/health-check.use-case'
import type { HealthCheckResponseDto } from '../dto/health-check-response.dto'

declare module 'fastify' {
  interface FastifyInstance {
    healthCheckUseCase: HealthCheckUseCase
  }
}

const HealthController = {
  async getHealthStatus(
    this: FastifyInstance,
    _request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<HealthCheckResponseDto> {
    const result = await this.healthCheckUseCase.execute()
    return reply.status(200).send(result)
  },
}

export default HealthController
