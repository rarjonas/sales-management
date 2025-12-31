import pino from 'pino'
import { env } from '@/shared/config/env'

export const logger = pino({
  level: env.LOG_LEVEL,
})
