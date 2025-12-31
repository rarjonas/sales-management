export class DatabaseException extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: unknown,
  ) {
    super(message)
    this.name = 'DatabaseException'
    Object.setPrototypeOf(this, DatabaseException.prototype)
  }
}

export class DatabaseConnectionException extends DatabaseException {
  constructor(message: string, originalError?: unknown) {
    super(message, 'DATABASE_CONNECTION_ERROR', originalError)
    this.name = 'DatabaseConnectionException'
    Object.setPrototypeOf(this, DatabaseConnectionException.prototype)
  }
}

export class DatabaseQueryException extends DatabaseException {
  constructor(
    message: string,
    public readonly query?: string,
    originalError?: unknown,
  ) {
    super(message, 'DATABASE_QUERY_ERROR', originalError)
    this.name = 'DatabaseQueryException'
    Object.setPrototypeOf(this, DatabaseQueryException.prototype)
  }
}

export class DatabaseConstraintException extends DatabaseException {
  constructor(
    message: string,
    public readonly constraint?: string,
    originalError?: unknown,
  ) {
    super(message, 'DATABASE_CONSTRAINT_ERROR', originalError)
    this.name = 'DatabaseConstraintException'
    Object.setPrototypeOf(this, DatabaseConstraintException.prototype)
  }
}

export class DatabaseNotFoundException extends DatabaseException {
  constructor(message: string, originalError?: unknown) {
    super(message, 'DATABASE_NOT_FOUND', originalError)
    this.name = 'DatabaseNotFoundException'
    Object.setPrototypeOf(this, DatabaseNotFoundException.prototype)
  }
}
