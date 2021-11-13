//
import nr8 from '@nr8/core'
import fastify from 'fastify'

//
const server = fastify({ logger: true })

//
const api = nr8()

//
server.get('/:resource', async (request: any, reply) => {
  const { resource } = request.params

  try {
    const results = await api.read(resource)

    if (results) {
      return reply.code(200).send(results)
    } else {
      return reply.code(404).send({ message: 'Not Found' })
    }
  } catch (err) {
    return reply.code(500).send({ message: err.message })
  }
})

//
server.get('/:resource/:index', async (request: any, reply) => {
  const { resource, index } = request.params

  try {
    const result = await api.read(resource, index)

    if (result) {
      return reply.code(200).send(result)
    } else {
      return reply.code(404).send({ message: 'Not Found' })
    }
  } catch (err) {
    return reply.code(500).send({ message: err.message })
  }
})

//
const start = async () => {
  try {
    await api.init()
    await server.listen(3000)
  } catch (err) {
    process.exit(1)
  }
}

start()
