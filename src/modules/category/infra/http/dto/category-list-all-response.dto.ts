import type { z } from 'zod'
import type { categoryListAllResponseSchema } from '../schemas/category.schema'

/**
 * DTO (Data Transfer Object) - Health Check Response
 * Tipo TypeScript inferido do schema Zod
 * Representa os dados que trafegam entre as camadas (Core <-> Infrastructure)
 */
export type CategoryListAllResponseDto = z.infer<
  typeof categoryListAllResponseSchema
>
