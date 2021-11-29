//
import fastify from 'fastify'
import nr8 from '@nr8/server-core'

//
export const create = (nr8) => async (req: any, reply) => {
  const { status, body } = await nr8.create(req.body)

  return reply
    .code(status)
    .send(body)
}

//
export const readAll = (nr8) => async (req: any, reply) => {
  const [resource] = Object.values(req.params)

  //
  const { status, body } = await nr8.read(resource)

  return reply
    .code(status)
    .send(body)
}

//
export const readOne = (nr8) => async (req: any, reply) => {
  const [resource, index] = Object.values(req.params)

  //
  const { status, body } = await nr8.read(resource, index)

  return reply
    .code(status)
    .send(body)
}

//
export const updateOne = (nr8) => async (req: any, reply) => {
  const [resource, index] = Object.values(req.params)

  //
  const { status, body } = await nr8.update(resource, index, req.body)

  return reply
    .code(status)
    .send(body)
}

//
export const deleteOne = (nr8) => async (req: any, reply) => {
  const [resource, index] = Object.values(req.params)

  //
  const { status, body } = await nr8.delete(resource, index, req.body)

  return reply
    .code(status)
    .send(body)
}

export const routes = (fastify, opts, done) => {
  const { api } = opts

  fastify.get('/:resource', readAll(api))
  fastify.get('/:resource/:id', readOne(api))
  fastify.put('/:resource/:id', updateOne(api))
  fastify.delete('/:resource/:id', deleteOne(api))

  done()
}

export default async function (config: any = {}) {
  const { server: serverConfig, ...apiConfig } = config

  // 
  const api = await nr8(apiConfig)

  //
  const routesConfig = serverConfig.routes || {}
  const fastifyOrConfig = serverConfig.fastify || {}

  //
  const server = typeof fastifyOrConfig.register !== 'function'
    ? fastify(fastifyOrConfig)
    : fastifyOrConfig

  //
  if (routesConfig.register !== false) {
    server.register(routes, { api, ...routesConfig })
  }

  // alias for fastify listen
  const listen = server.listen.bind(server)

  //
  return {
    ...api,
    server,
    listen
  }
}
