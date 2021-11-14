//
import narrative from '@nr8/core'

// wrap nr8 methods for http handlers
export const handler = (method) => async (resource) => {
  try {
    const payload = await method(resource)

    if (payload) {
      return { statusCode: 200, payload }
    } else {
      return { statusCode: 404, payload: { message: 'Not Found' } }
    }
  } catch (err) {
    return { statusCode: 500, payload: { message: err.message } }
  }
}

// nr8 http handler wrapper
export default function (config = {}) {
  const nr8 = narrative(config)

  return {
    init: nr8.init,
    create: handler(nr8.create),
    read: handler(nr8.read),
    update: handler(nr8.update),
    destroy: handler(nr8.destroy)
  }
}
