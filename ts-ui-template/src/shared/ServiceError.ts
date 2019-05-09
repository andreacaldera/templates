// Built-in types like Error cannot be extended and still work as expected.
// See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
import Ajv from 'ajv'

export enum ErrorType {
  SERVICE_ERROR = 'SERVICE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  REPOSITORY_ERROR = 'REPOSITORY_ERROR'
}

export class ServiceError {
  public name = ''
  public type: ErrorType = ErrorType.SERVICE_ERROR
  constructor(public readonly message: string) {}
}

export class NotFoundError extends ServiceError {
  public readonly name = 'NotFoundError'
  public readonly type = ErrorType.NOT_FOUND_ERROR
}

export class RepositoryError extends ServiceError {
  public readonly name = 'RepositoryError'
  public readonly type = ErrorType.REPOSITORY_ERROR
}

export type ValidationDetail = {
  name: string
  message?: string
}

export class ValidationError extends ServiceError {
  public readonly name = 'ValidationError'
  public readonly type = ErrorType.VALIDATION_ERROR

  constructor(message: string, public readonly details: ReadonlyArray<ValidationDetail> = []) {
    super(message)
  }

  static fromErrorObjects(message: string, errors: Ajv.ErrorObject[] = []): ValidationError {
    const details = errors.map(err => {
      // TODO: Add other validation errors (in ajv.ErrorParameters)
      if (err.keyword === 'required') {
        const dataPath = err.dataPath ? `${err.dataPath.slice(1)}.` : ''
        return {
          name: `${dataPath}${((err.params as any) as Ajv.RequiredParams).missingProperty}`
        }
      }
      return {
        name: err.dataPath.slice(1)
      }
    })
    return new ValidationError(message, details)
  }
}

export function throwError(error: ServiceError): never {
  throw error
}

const STATUS_CODES = {
  [ErrorType.VALIDATION_ERROR]: 400,
  [ErrorType.NOT_FOUND_ERROR]: 404,
  [ErrorType.REPOSITORY_ERROR]: 500,
  [ErrorType.SERVICE_ERROR]: 500
}

export function toStatusCode(type: ErrorType): number {
  return STATUS_CODES[type]
}
