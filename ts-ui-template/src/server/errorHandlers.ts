import express from 'express'
import { toStatusCode, ServiceError, ErrorType, ValidationError } from '../shared/ServiceError'
import { logger } from './infra/logger'

type ErrorHandlerContext = {
  app: express.Express
}

export function setErrorHandlers({ app }: ErrorHandlerContext) {
  app.all('*', (_, res) => {
    res.sendStatus(404)
  })

  app.use(
    (
      err: Error | ServiceError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      const statusCode = err instanceof ServiceError ? toStatusCode(err.type) : 500
      const message = statusCode === 500 ? 'Internal server error' : err.message
      logger.error('Service error', err)
      res.status(statusCode)
      res.send({
        error: err instanceof ServiceError ? err.type : ErrorType.SERVICE_ERROR,
        message,
        details: err instanceof ValidationError ? err.details : null,
      })
    },
  )
}
