// add pino
import pino from 'pino'

// create logger
export const logger = pino({
  // add transport to pretty
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard'
    }
  },
  level: process.env.LOG_LEVEL || 'info'
})
