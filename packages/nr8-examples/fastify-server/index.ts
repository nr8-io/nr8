//
import fastify from 'fastify'
import nr8, { withDefinitions, withControllers } from '@nr8/core'
import withGateway from '@nr8/gateway'
import { create, readOne, readAll } from '@nr8/server-fastify'

//
const server = fastify({ logger: true })
let api = nr8()

//
const start = async () => {
  try {
    console.log(1)

    api = await withDefinitions(api)
    api = await withControllers(api)
    api = await withGateway(api)

    console.log(await api.context.storage.keys())

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
