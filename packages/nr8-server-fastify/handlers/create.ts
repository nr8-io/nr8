//
export const create = (nr8) => async (req: any, reply) => {
  try {
    const result = await nr8.create(req.body)

    return reply.code(200).send(result)
  } catch (err) {
    return reply.code(500).send({ message: err.message })
  }
}

export default create
