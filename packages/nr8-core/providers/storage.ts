import async from 'async'
import { get as _get } from 'lodash'

// simple in memory storage adaptor
import defaultStorage from '../adaptors/default-storage'

//
export default function (adaptor = defaultStorage()) {
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
    const uid = _get(object, 'metadata.uid')

    await adaptor.set(`/objects/${uid}`, object)
    await adaptor.set(`/indexes/${uid}`, index)

    console.log(index)

    await async.each(index, async (index) => {
      await adaptor.set(index, `/objects/${uid}`)
    })

    console.log(1, uid)
  }

  // get a single resource
  async function del (path: any) {
    let obejct = await adaptor.get(path)

    if (typeof obejct === 'string') {
      obejct = await adaptor.get(obejct)
    }

    const uid = _get(obejct, 'metadata.uid')
    const index: any = await adaptor.get(`/indexes/${uid}`)

    await adaptor.del(`/objects/${uid}`)
    await adaptor.del(`/indexes/${uid}`)

    await async.each(index, async (index) => {
      await adaptor.del(index)
    })
  }

  return { set, get, del, lget, keys: adaptor.keys }
}
