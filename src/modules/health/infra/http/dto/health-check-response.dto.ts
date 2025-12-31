import type { z } from 'zod'
import type { healthCheckResponseSchema } from '../schemas/health-check.schema'

/**
 * DTO (Data Transfer Object) - Health Check Response
 * Tipo TypeScript inferido do schema Zod
 * Representa os dados que trafegam entre as camadas (Core <-> Infrastructure)
 */
export type HealthCheckResponseDto = z.infer<typeof healthCheckResponseSchema>
