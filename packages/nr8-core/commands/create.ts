import { nanoid } from 'nanoid'
import { forEach } from 'lodash'
import { get } from 'lodash/fp'

//
import jp from '@nr8/jmespath'
import { error } from '@nr8/core/providers/log'

//
import { eventListeners } from '../providers/events'

//
export async function createResourceDefinition (object) {
  const { storage } = this

  // @TODO validate ResourceDefinition

  //
  const name = get('metadata.name', object)

  //
  const resource = await storage.get(`/definitions/${name}`)

  if (resource) {
    throw new Error(`definition "${name}" already exists`)
  }

  //
  const uid = nanoid()
  const singular = get('spec.names.singular', object)
  const plural = get('spec.names.plural', object)
  const type = get('spec.names.type', object)

  //
  const nextObject = {
    ...object,
    metadata: {
      ...object.metadata,
      uid
    },
    status: 'created'
  }

  //
  await storage.set(nextObject, [
    `/definitions/${name}`,
    `/definitions_by_name/${singular}`,
    `/definitions_by_name/${plural}`,
    `/types/${type}`
  ])

  //
  return nextObject
}

//
export async function createController (object) {
  const { storage, events } = this
  const { apiVersion, type } = object

  const [, version] = apiVersion.split('/')

  //
  const definition = await storage.get(`/types/${type}`)

  if (!definition) {
    throw new Error(`resource definition for "${type}" does not exist`)
  }

  //
  const singular = get('spec.names.singular', definition)
  const plural = get('spec.names.plural', definition)
  const name = get('metadata.name', object)

  //
  const resource = await storage.get(`/${plural}/${name}`)

  if (resource) {
    throw new Error(`${singular} "${name}" already exists`)
  }

  //
  const versionSpec = jp(`spec.versions[?name==\`${version}\`] | [0]`, definition)

  if (versionSpec) {
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
    const hook = get('spec.hooks.create.handler', nextObject)

    if (hook && hook.type === 'node') {
      const module = require(hook.path)

      nextObject = await module[hook.subPath || 'default'].apply(this, [nextObject])

      // @TODO validate response
    }

    //
    await storage.set(nextObject, [
      `/${plural}/${index}`
    ])

    //
    events.emit('/objects/create', nextObject)
    events.emit(`/objects/${uid}/create`, nextObject)

    events.emit(`/${plural}/create`, nextObject)
    events.emit(`/${plural}/${index}/create`, nextObject)

    // attach event listeners
    const listeners = get('spec.eventListeners', nextObject)

    forEach(listeners, ({ name, handler }) => {
      if (handler && handler.type === 'node') {
        const module = require(handler.path)

        eventListeners[`/${plural}/${name}`] = async (object) => {
          await module[handler.subPath || 'default'].apply(this, [object])
        }

        events.on(`/${name}`, eventListeners[`/${plural}/${name}`])
      }
    })

    //
    return nextObject
  } else {
    error({ apiVersion, type }, 'resource definition does not exist')
  }
}

// default create method
export async function createResource (object) {
  const { storage, events } = this
  const { apiVersion, type } = object

  const [, version] = apiVersion.split('/')

  //
  const definition = await storage.get(`/types/${type}`)

  if (!definition) {
    throw new Error(`resource definition for "${type}" does not exist`)
  }

  //
  const singular = get('spec.names.singular', definition)
  const plural = get('spec.names.plural', definition)
  const name = get('metadata.name', object)

  //
  const resource = await storage.get(`/${plural}/${name}`)

  if (resource) {
    throw new Error(`${singular} "${name}" already exists`)
  }

  //
  const versionSpec = jp(`spec.versions[?name==\`${version}\`] | [0]`, definition)

  if (versionSpec) {
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

    // run create hook
    const hook = get('hooks.create.handler', versionSpec)

    if (hook && hook.type === 'node') {
      const module = require(hook.path)

      nextObject = await module[hook.subPath || 'default'].apply(this, [nextObject])

      // @TODO validate response
    }

    // don't write transient objects to storage on create
    const transient = get('spec.transient', definition)

    if (!transient) {
      await storage.set(nextObject, [
        `/${plural}/${index}`
      ])
    }

    //
    events.emit('/objects/create', nextObject)
    events.emit(`/objects/${uid}/create`, nextObject)

    events.emit(`/${plural}/create`, nextObject)
    events.emit(`/${plural}/${index}/create`, nextObject)

    //
    return nextObject
  } else {
    error({ apiVersion, type }, 'resource definition does not exist')
  }
}

//
export default async function create (object) {
  const { type } = object

  // @TODO validate api object

  // handle special resource types
  switch (type) {
    case 'Controller':
      return await createController.apply(this, [object])
    case 'ResourceDefinition':
      return await createResourceDefinition.apply(this, [object])
    default:
      return await createResource.apply(this, [object])
  }
}
