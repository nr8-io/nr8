//
import fastify from 'fastify'
import narrative from '@nr8/server-core'

//
export const create = (handler) => async (request: any, reply) => {
  const { statusCode, payload } = await handler(request.body)

  return reply
    .code(statusCode)
    .send(payload)
}

//
export const readAll = (handler) => async (request: any, reply) => {
  const { resource } = request.params

  //
  const { statusCode, payload } = await handler(resource)

  return reply
    .code(statusCode)
    .send(payload)
}

//
export const readOne = (handler) => async (request: any, reply) => {
  const { resource, index } = request.params

  //
  const { statusCode, payload } = await handler(resource, index)

  return reply
    .code(statusCode)
    .send(payload)
}

//
export default function (config: any = {}) {
  const nr8 = narrative(config.narrative)
  const server = fastify(config)

  //
  server.post('/', create(nr8.create))
  server.get('/:resource', readAll(nr8.read))
  server.get('/:resource/:index', readOne(nr8.read))

  //
  const listen = server.listen.bind(server)

  server.listen = async (...args) => {
    await nr8.init()

    return listen(...args)
  }

  //
  return server
}
