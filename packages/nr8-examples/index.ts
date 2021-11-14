//
import fastify from '@nr8/server-fastify'
import { init } from '@nr8/gateway/handlers/requests'

//
const server = fastify({ logger: true })

//
const start = async () => {
  try {
    await server.listen(3000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start();
