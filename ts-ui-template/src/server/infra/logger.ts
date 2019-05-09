import { createLogger, transports, format } from 'winston'

import { config } from './config'

export const logger = createLogger({
  level: config.logLevel,
  transports: [new transports.Console()],
  format: format.combine(format.timestamp(), format.colorize(), format.simple()),
})
