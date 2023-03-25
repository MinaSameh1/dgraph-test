import express from 'express'
import { logger } from '../utils'

export function loggerMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const start = Date.now()
  res.on('finish', () => {
    const delta = Date.now() - start
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      responseTime: `${delta}ms`,
      contentLength: res.get('Content-Length'),
      type: res.get('Content-Type'),
      userAgent: req.get('User-Agent')
    })
  })
  next()
}
