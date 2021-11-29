//
export const deleteOne = (nr8) => async (req: any, reply) => {
  const [resource, index] = Object.values(req.params)

  try {
    const result = await nr8.delete(resource, index, req.body)

    return reply.code(200).send(result)
  } catch (err) {
    return reply.code(500).send({ message: err.message })
  }
}

export default deleteOne
