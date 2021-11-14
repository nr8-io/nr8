//
import fastify from '@nr8/server-fastify'
import { definitions, controllers } from '@nr8/gateway'

//
const server = fastify({
  narrative: {
    resources: [
      ...controllers,
      ...definitions
    ]
  },
  logger: true
})

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
