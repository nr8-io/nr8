
//
import dashboard from '@nr8/dashboard'
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
          // register: false // default: true
          prefix: '/v1' // default: null
        },
        fastify: {
          logger: true
        }
      }
    })

    const app = dashboard({
      // basePath: '/dashboard'
    })
    
    //
    api.server.route({
      url: '/*',
      method: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS'],
      handler: app.getRequestHandler()
    })

    await api.listen(3000)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()