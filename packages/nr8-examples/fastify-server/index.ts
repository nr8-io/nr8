//
import gateway from '@nr8/gateway'
import nr8 from '@nr8/server-fastify'

//
const start = async () => {
  try {
    const api = await nr8({
      plugins: [
        gateway
      ],
      server: {
        routes: {
          prefix: '/v1' // default: null
        },
        fastify: {
          logger: true
        }
      }
    })

    await api.listen(8080)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()
