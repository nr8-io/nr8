import NodeCache from 'node-cache'
import _, { startsWith } from 'lodash/fp'
import async from 'async'

//
const cache = new NodeCache()

//
export function defaultStorageAdaptor () {
  return {
    get: async (path: any) => {
      return cache.get(path)
    },
    set: async (path: any, val: any) => {
      return cache.set(path, val)
    },
    del: async (path: any) => {
      return cache.del(path)
    },
    lget: async (path: any) => {
      const keys = cache.keys()
        .filter(startsWith(path))

      return keys.map((key) => cache.get(key))
    },
    keys: async () => {
      return cache.keys()
    }
  }
}

//
const defaultStorageOptions = {
  adaptor: defaultStorageAdaptor()
}

//
export default function (options = defaultStorageOptions) {
  const { adaptor } = options

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
