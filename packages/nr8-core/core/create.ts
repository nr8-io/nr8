import { nanoid } from 'nanoid'
import { get, forEach } from 'lodash'

//
import { eventListeners } from '../providers/events'

//
export async function createController (ctx, object) {
  const { storage, events } = ctx
  const { type } = object

  //
  const definition = await storage.get(`/definitions/${type}`)

  if (!definition) {
    throw new Error(`resource definition for "${type}" does not exist`)
  }

  //
  const singular = get(definition, 'spec.names.singular')
  const plural = get(definition, 'spec.names.plural')
  const name = get(object, 'metadata.name')

  //
  const resource = await storage.get(`/resources/${plural}/${name}`)

  if (resource) {
    throw new Error(`${singular} "${name}" already exists`)
  }

  const uid = nanoid()
  const index = name || uid // unique key

  //
  let nextObject = {
    ...object,
    metadata: {
      ...object.metadata,
      createdAt: new Date().toISOString(),
      uid
    },
    status: {
      message: 'Created'
    }
  }

  // controller hook
  const hook = get(nextObject, 'spec.hooks.create.handler')

  if (hook && hook.type === 'node') {
    const module = require(hook.path)

    nextObject = await module[hook.subPath || 'default'](ctx, nextObject)

    // @TODO validate response
  }

  //
  await storage.set(nextObject, [
    `/resources/${plural}/${index}`
  ])

  //
  events.emit('/objects/create', nextObject)
  events.emit(`/objects/${uid}/create`, nextObject)

  //
  events.emit(`/resources/${plural}/create`, nextObject)
  events.emit(`/resources/${plural}/${index}/create`, nextObject)

  // attach event listeners
  const listeners = get(nextObject, 'spec.eventListeners')

  forEach(listeners, ({ name, handler }) => {
    if (handler && handler.type === 'node') {
      const module = require(handler.path)

      eventListeners[`/resources/${plural}/${name}`] = async (object) => {
        await module[handler.subPath || 'default'](ctx, object)
      }

      events.on(`/resources/${name}`, eventListeners[`/resources/${plural}/${name}`])
    }
  })

  //
  return nextObject
}

//
export async function createResourceDefinition (ctx, object) {
  const { storage } = ctx

  // @TODO validate ResourceDefinition

  //
  const name = get(object, 'metadata.name')

  //
  const resource = await storage.get(`/objects/${name}`)

  if (resource) {
    throw new Error(`definition "${name}" already exists`)
  }

  //
  const uid = nanoid()
  const index = name || uid // unique key
  const type = get(object, 'spec.names.type')
  const singular = get(object, 'spec.names.singular')
  const plural = get(object, 'spec.names.plural')

  //
  const nextObject = {
    ...object,
    metadata: {
      ...object.metadata,
      createdAt: new Date().toISOString(),
      uid
    },
    status: {
      message: 'Created'
    }
  }

  //
  await storage.set(nextObject, [
    `/definitions/${type}`,
    `/definitions/${singular}`,
    `/definitions/${plural}`,
    `/resources/definitions/${index}`
  ])

  //
  return nextObject
}

// default create method
export async function createResource (ctx, object) {
  const { storage, events } = ctx
  const { type } = object

  //
  const definition = await storage.get(`/definitions/${type}`)

  if (!definition) {
    throw new Error(`resource definition for "${type}" does not exist`)
  }

  //
  const singular = get(definition, 'spec.names.singular')
  const plural = get(definition, 'spec.names.plural')
  const name = get(object, 'metadata.name')

  //
  const resource = await storage.get(`/resources/${plural}/${name}`)

  if (resource) {
    throw new Error(`${singular} "${name}" already exists`)
  }

  const uid = nanoid()
  const index = name || uid // unique key

  //
  const nextObject = {
    ...object,
    metadata: {
      ...object.metadata,
      createdAt: new Date().toISOString(),
      uid
    },
    status: {
      message: 'Created'
    }
  }

  // don't write transient objects to storage on create
  const transient = get(definition, 'spec.transient')

  if (!transient) {
    await storage.set(nextObject, [
      `/resources/${plural}/${index}`
    ])
  }

  //
  events.emit('/objects/create', nextObject)
  events.emit(`/objects/${uid}/create`, nextObject)

  events.emit(`/resources/${plural}/create`, nextObject)
  events.emit(`/resources/${plural}/${index}/create`, nextObject)

  //
  return nextObject
}

//
export default async function create (ctx, object) {
  const { type } = object

  // @TODO validate api object
  if (!type) {
    throw new Error('type is required')
  }

  // handle special resource types
  switch (type) {
    case 'Controller':
      return createController(ctx, object)
    case 'ResourceDefinition':
      return createResourceDefinition(ctx, object)
    default:
      return createResource(ctx, object)
  }
}
