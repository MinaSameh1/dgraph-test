import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { loggerMiddleware } from './middleware'
import { logger } from './utils'
import NodesRouter from './router/nodes.router'

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggerMiddleware)

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.use('/node', NodesRouter)

app.use(
  (
    err: Error & { code: number },
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: express.NextFunction
  ) => {
    logger.error({
      message: err.message,
      error: err.name,
      stack: err.stack,
      code: err.code ?? 500
    })
    res.status(500).send('Internal Server Error')
  }
)

export default app
