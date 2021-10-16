import { once } from 'events'
import { get } from 'lodash'

//
export async function list (resource) {
  const { events, storage } = this

  //
  const definition = await storage.get(`/definitions/${resource}`)

  if (!definition) {
    throw new Error(`definition for "${resource}" does not exist`)
  }

  const plural = get(definition, 'spec.names.plural')
  const result = await storage.lget(`/resources/${plural}/`)

  if (result) {
    events.emit('/objects/list', result)
    events.emit(`/resources/${plural}/list`, result)

    return result
  }
}

// read from transient create events
export async function readTransient (resource, id) {
  const { events, storage } = this

  //
  const definition = await storage.get(`/definitions/${resource}`)

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

    const uid = get(result, 'metdata.uid')
    const index = get(result, 'metdata.name', uid)

    events.emit('/objects/read', result)
    events.emit(`/objects/${uid}/read`, result)

    events.emit(`/resources/${plural}/read`, result)
    events.emit(`/resources/${plural}/${index}/read`, result)

    return result
  } catch (err) {
    if (err.name !== 'AbortError') {
      throw err
    }
  }
}

//
export default async function read (resource, index?) {
  const { events, storage } = this

  if (!index) {
    return list.apply(this, [resource])
  }

  //
  const definition = await storage.get(`/definitions/${resource}`)

  if (!definition) {
    throw new Error(`definition for "${resource}" does not exist`)
  }

  //
  const transient = get(definition, 'spec.transient')
  const plural = get(definition, 'spec.names.plural')

  //
  const result = await storage.get(`/resources/${plural}/${index}`)

  //
  if (result) {
    const uid = get(result, 'metdata.uid')
    const index = get(result, 'metdata.name', uid)

    events.emit('/objects/read', result)
    events.emit(`/objects/${uid}/read`, result)

    events.emit(`/resources/${plural}/read`, result)
    events.emit(`/resources/${plural}/${index}/read`, result)

    return result
  } else if (transient) {
    return readTransient.apply(this, [resource, index])
  }
}
