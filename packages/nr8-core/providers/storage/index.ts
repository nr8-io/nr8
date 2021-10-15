import async from 'async'
import _, { startsWith } from 'lodash/fp'

// simple in memory storage adaptor
export function defaultStorageAdaptor () {
  const cache = {}

  return {
    get: async (path: any) => {
      return cache[path]
    },
    set: async (path: any, val: any) => {
      cache[path] = val
      return val
    },
    del: async (path: any) => {
      delete cache[path]
    },
    lget: async (path: any) => {
      const keys = Object.keys(cache)
        .filter(startsWith(path))

      return keys.map((key) => cache[key])
    },
    keys: async () => {
      return Object.keys(cache)
    }
  }
}

//
export default function (adaptor = defaultStorageAdaptor()) {
  // get a single resource
  async function get (path: any) {
    const result = await adaptor.get(path)

    if (typeof result === 'string') {
      return await adaptor.get(result)
    } else {
      return result
    }
  }

  // get a list of resources
  async function lget (path: any) {
    const list = await adaptor.lget(path)

    return async.map(list, async (result) => {
      if (typeof result === 'string') {
        return await adaptor.get(result)
      } else {
        return result
      }
    })
  }

  //
  async function set (object, index = []) {
    const uid = _.get('metadata.uid', object)

    await adaptor.set(`/objects/${uid}`, object)
    await adaptor.set(`/indexes/${uid}`, index)

    await async.each(index, async (index) => {
      await adaptor.set(index, `/objects/${uid}`)
    })
  }

  // get a single resource
  async function del (path: any) {
    let obejct = await adaptor.get(path)

    if (typeof obejct === 'string') {
      obejct = await adaptor.get(obejct)
    }

    const uid = _.get('metadata.uid', obejct)
    const index: any = await adaptor.get(`/indexes/${uid}`)

    await adaptor.del(`/objects/${uid}`)
    await adaptor.del(`/indexes/${uid}`)

    await async.each(index, async (index) => {
      await adaptor.del(index)
    })
  }

  return {
    set,
    get,
    del,
    lget,
    keys: adaptor.keys
  }
}
