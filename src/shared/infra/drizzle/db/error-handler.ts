import {
  DatabaseConnectionException,
  DatabaseConstraintException,
  DatabaseException,
  DatabaseQueryException,
} from '@/shared/core/exceptions/database.exception'

interface PostgresError extends Error {
  code?: string
  constraint?: string
  detail?: string
  hint?: string
  position?: string
  internalPosition?: string
  internalQuery?: string
  where?: string
  schema?: string
  table?: string
  column?: string
  dataType?: string
}

const isPostgresError = (error: unknown): error is PostgresError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as PostgresError).code === 'string'
  )
}

export const handleDatabaseError = (
  error: unknown,
  context?: string,
): never => {
  if (isPostgresError(error)) {
    const errorCode = error.code
    const errorMessage = error.message || 'Erro desconhecido do banco de dados'
    const contextMessage = context ? ` [${context}]` : ''

    switch (errorCode) {
      case '23505': // unique_violation
        throw new DatabaseConstraintException(
          `Violação de constraint única${contextMessage}: ${errorMessage}`,
          error.constraint,
          error,
        )

      case '23503': // foreign_key_violation
        throw new DatabaseConstraintException(
          `Violação de chave estrangeira${contextMessage}: ${errorMessage}`,
          error.constraint,
          error,
        )

      case '23502': // not_null_violation
        throw new DatabaseConstraintException(
          `Violação de campo não nulo${contextMessage}: ${errorMessage}`,
          error.constraint,
          error,
        )

      case '23514': // check_violation
        throw new DatabaseConstraintException(
          `Violação de constraint de verificação${contextMessage}: ${errorMessage}`,
          error.constraint,
          error,
        )

      case '42P01': // undefined_table
        throw new DatabaseQueryException(
          `Tabela não encontrada${contextMessage}: ${errorMessage}`,
          error.internalQuery,
          error,
        )

      case '42703': // undefined_column
        throw new DatabaseQueryException(
          `Coluna não encontrada${contextMessage}: ${errorMessage}`,
          error.internalQuery,
          error,
        )

      case '08003': // connection_does_not_exist
      case '08006': // connection_failure
      case '08001': // sqlclient_unable_to_establish_sqlconnection
        throw new DatabaseConnectionException(
          `Erro de conexão com o banco de dados${contextMessage}: ${errorMessage}`,
          error,
        )

      case '28P01': // invalid_password
        throw new DatabaseConnectionException(
          `Credenciais inválidas${contextMessage}: ${errorMessage}`,
          error,
        )

      case '3D000': // invalid_catalog_name
        throw new DatabaseConnectionException(
          `Banco de dados não encontrado${contextMessage}: ${errorMessage}`,
          error,
        )

      default:
        throw new DatabaseQueryException(
          `Erro na consulta ao banco de dados${contextMessage}: ${errorMessage}`,
          error.internalQuery,
          error,
        )
    }
  }

  if (error instanceof DatabaseException) {
    throw error
  }

  if (error instanceof Error) {
    throw new DatabaseException(
      `Erro no banco de dados${context ? ` [${context}]` : ''}: ${error.message}`,
      undefined,
      error,
    )
  }

  throw new DatabaseException(
    `Erro desconhecido no banco de dados${context ? ` [${context}]` : ''}`,
    undefined,
    error,
  )
}
