import { once } from 'events'
import { get, getOr } from 'lodash/fp'

//
export async function list (resource) {
  const { events, storage } = this

  //
  const definition = await storage.get(`/definitions_by_name/${resource}`)

  if (!definition) {
    throw new Error(`definition for "${resource}" does not exist`)
  }

  const plural = get('spec.names.plural', definition)
  const result = await storage.lget(`/${plural}/`)

  if (result) {
    events.emit('/objects/list', result)
    events.emit(`/${plural}/list`, result)

    return result
  }
}

// read from transient create events
export async function readTransient (resource, id) {
  const { events, storage } = this

  //
  const definition = await storage.get(`/definitions_by_name/${resource}`)

  if (!definition) {
    throw new Error(`definition for "${resource}" does not exist`)
  }

  //
  const plural = get('spec.names.plural', definition)

  // handle timeouts
  const abortController = new AbortController()

  setTimeout(() => {
    abortController.abort()
  }, 30000)

  //
  try {
    // @ts-expect-error
    const [result] = await once(events, `/${plural}/${id}/create`, {
      signal: abortController.signal
    })

    const uid = get('metdata.uid', result)
    const name = getOr(uid, 'metdata.name', result)

    events.emit('/objects/read', result)
    events.emit(`/objects/${uid}/read`, result)

    events.emit(`/${plural}/read`, result)
    events.emit(`/${plural}/${name}/read`, result)

    return result
  } catch (err) {
    if (err.name !== 'AbortError') {
      throw err
    }
  }
}

//
export default async function read (resource, id?) {
  const { events, storage } = this

  if (!id) {
    return list.apply(this, [resource])
  }

  //
  const definition = await storage.get(`/definitions_by_name/${resource}`)

  if (!definition) {
    throw new Error(`definition for "${resource}" does not exist`)
  }

  //
  const transient = get('spec.transient', definition)
  const plural = get('spec.names.plural', definition)

  //
  const result = await storage.get(`/${plural}/${id}`)

  //
  if (result) {
    const uid = get('metdata.uid', result)
    const name = getOr(uid, 'metdata.name', result)

    events.emit('/objects/read', result)
    events.emit(`/objects/${uid}/read`, result)

    events.emit(`/${plural}/read`, result)
    events.emit(`/${plural}/${name}/read`, result)

    return result
  } else if (transient) {
    return readTransient.apply(this, [resource, id])
  }
}
