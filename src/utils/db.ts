import dgraph from 'dgraph-js'
import { logger } from './logger'

let dgraphClient: dgraph.DgraphClient

export function connectToDatabase() {
  const client = dgraph.clientStubFromCloudEndpoint(
    'https://nameless-brook-400305.eu-central-1.aws.cloud.dgraph.io/graphql',
    process.env.DGRAPH_API_KEY
  )

  dgraphClient = new dgraph.DgraphClient(client)
  logger.info('Connected to database and dgraph')
}

export function getDgraphClient() {
  if (!dgraphClient) {
    throw new Error('Dgraph client not initialized')
  }
  return dgraphClient
}

export function closeDatabase() {
  logger.info('Closing dgraph client')
  return dgraphClient.anyClient().close()
}
