import { config } from './server/infra/config'

import { createAndConfigureApp } from './server'
import { logger } from './server/infra/logger'

setupProcessHooks()

const { startApp } = createAndConfigureApp({
  config,
})

startApp()
  .then(() => {
    logger.info('Service is up')
  })
  .catch((err) => {
    logger.error('Startup error', err)
    exitProcessWithError('Startup error')
  })

function setupProcessHooks(): void {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception', err)
    exitProcessWithError('Uncaught exception')
  })

  process.on('SIGINT', () => {
    exitProcessWithError('SIGINT received, shutting down app')
  })
}

function exitProcessWithError(errorMsg: string): void {
  logger.error('Shutting down app: ', errorMsg)
  process.exit(1)
}
