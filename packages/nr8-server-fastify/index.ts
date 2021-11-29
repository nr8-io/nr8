//
import nr8 from '@nr8/core'
import fastify from 'fastify'

//
import create from './handlers/create'
import update from './handlers/update'
import { readOne, readAll } from './handlers/read'
import deleteOne from './handlers/delete'

//
function routes (server, opts, done) {
  const { api } = opts

  server.post('/:resource', create(api))
  server.get('/:resource', readAll(api))
  server.get('/:resource/:id', readOne(api))
  server.put('/:resource/:id', update(api))
  server.delete('/:resource/:id', deleteOne(api))

  done()
}

//
async function server (config: any = {}) {
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

//
export default server

//
export {
  routes,
  create,
  update,
  readOne,
  readAll,
  deleteOne
}
