//
import fastify from 'fastify'
import { seq } from 'async'
import nr8, { withDefinitions, withControllers } from '@nr8/core'
import withGateway from '@nr8/gateway'
import { create, readOne, readAll } from '@nr8/server-fastify'

//
const server = fastify({ logger: true })

//
const start = async () => {
  try {
    const middleware = seq(
      withDefinitions,
      withControllers,
      withGateway
    )

    const api = await middleware(nr8())

    console.log(api)

    server.get('/:resource', async (request, reply) => {
      return reply
        .code(200)
        .send({})
    })

    await server.listen(3000)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start();
