//
import nr8 from '@nr8/core'

//
function success (body) {
  return { status: 200, body }
}

function notFound () {
  return { status: 404, body: { message: 'Not Found' } }
}

//
function error (message) {
  return { status: 500, body: { message } }
}

//
export const create = (api) => async (resource) => {
  try {
    const result = await api.create(resource)

    return success(result)
  } catch (err) {
    return error(err.message)
  }
}

//
export const read = (api) => async (resource, index?) => {
  try {
    const result = await api.read(resource, index)

    if (result) {
      return success(result)
    }

    return notFound()
  } catch (err) {
    return error(err.message)
  }
}

//
export const update = (api) => async (resource) => {
  try {
    const result = await api.update(resource)

    return success(result)
  } catch (err) {
    return error(err.message)
  }
}

//
export const del = (api) => async (resource) => {
  try {
    const result = await api.delete(resource)

    return success(result)
  } catch (err) {
    return error(err.message)
  }
}

// nr8 http handler wrapper
export default async function (config = {}) {
  const api = await nr8(config)

  return {
    ...api,
    create: create(api),
    read: read(api),
    update: update(api),
    delete: del(api)
  }
}
