//
export const readAll = (nr8) => async (req: any, reply) => {
  const [resource] = Object.values(req.params)

  try {
    const result = await nr8.read(resource)

    if (result) {
      return reply.code(200).send(result)
    }

    return reply.code(404).send({ message: 'not found' })
  } catch (err) {
    return reply.code(500).send({ message: err.message })
  }
}

//
export const readOne = (nr8) => async (req: any, reply) => {
  const [resource, index] = Object.values(req.params)

  try {
    const result = await nr8.read(resource, index)

    if (result) {
      return reply.code(200).send(result)
    }

    return reply.code(404).send({ message: 'not found' })
  } catch (err) {
    return reply.code(500).send({ message: err.message })
  }
}
