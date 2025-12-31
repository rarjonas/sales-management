import type { HealthCheckResponseDto } from '../../infra/http/dto/health-check-response.dto'

/**
 * Use Case: Health Check
 * Lógica de negócio para verificar o status da API
 */
export class HealthCheckUseCase {
  async execute(): Promise<HealthCheckResponseDto> {
    return {
      message: 'API is running',
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }
}
