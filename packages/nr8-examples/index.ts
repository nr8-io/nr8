//
import fastify from 'fastify'
import narrative, { create, readOne, readAll } from '@nr8/server-fastify'
import { definitions, controllers } from '@nr8/gateway'

//
const server = fastify({ logger: true })

const nr8 = narrative({
  resources: [
    ...controllers,
    ...definitions
  ]
})
//
const start = async () => {
  try {
    await nr8.init()
    await server.listen(3000)
  } catch (err) {
    process.exit(1)
  }
}

start();
