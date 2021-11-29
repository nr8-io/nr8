//

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
