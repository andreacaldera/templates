import winston from 'winston';

const level = 'debug';

const logger = new (winston.Logger)({
  levels: {
    debug: 5,
    info: 4,
    help: 3,
    warn: 2,
    error: 1,
  },
  colors: {
    debug: 'green',
    info: 'blue',
    warn: 'yellow',
    error: 'red',
  },
});

logger.add(winston.transports.Console, {
  level,
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: false,
});

logger[level](`Logging level set to ${level}`);

export default logger;
