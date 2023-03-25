import 'dotenv/config'
import app from './server'
import { closeDatabase, connectToDatabase, logger } from './utils'

const port = process.env.PORT || 8000

export const bootstrap = async () => {
  connectToDatabase()
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`)
  })
}

const handleShutdown = (signal: string) => () => {
  logger.info(`${signal} signal received: closing HTTP server`)
  closeDatabase()
  ;(signal !== 'exit' && process.exit(1)) || process.exit(0)
}

bootstrap()

process.on('unhandledRejection', (err: Error) => {
  logger.error(err)
})

process.on('uncaughtException', (err: Error) => {
  logger.error(err)
})

process.on('SIGINT', handleShutdown('SIGINT'))
process.on('SIGTERM', handleShutdown('SIGTERM'))
process.on('exit', handleShutdown('exit'))
