import { loadFile as yaml } from '@nr8/lib-yaml'
import { seq } from 'async'
import { set, curry } from 'lodash'

// core api handlers
import create from './handlers/create'
import read from './handlers/read'
import update from './handlers/update'
import del from './handlers/delete'

// providers
// import { error } from './providers/log'
import eventsProvider from './providers/events'
import queueProvider from './providers/queue'
import storageProvider from './providers/storage'

// plugin composition helper
export const injectPlugins = curry(async (plugins, target) => {
  const init = seq(...plugins)

  return init(target)
})

// core definitions plugin
export async function withDefinitions (api) {
  await api.create(yaml(__dirname, 'definitions/definitions.yaml'))

  return api
}

// core controllers definition plugin
export async function withControllers (api) {
  await api.create(yaml(__dirname, 'definitions/controllers.yaml'))

  return api
}

// nr8 core
export function core (userConfig: any = {}) {
  const config = { ...userConfig }

  // default context
  const context = {
    events: eventsProvider(config.eventsAdaptor),
    queue: queueProvider(config.queueAdaptor),
    storage: storageProvider(config.storageAdaptor)
  }

  // inject handler with context
  function withContext (fn) {
    return (...args) => fn(context, ...args)
  }

  // core handlers with context
  const handlers = {
    create: withContext(create),
    read: withContext(read),
    update: withContext(update),
    delete: withContext(del)
  }

  // add handlers to context
  set(context, 'create', handlers.create)
  set(context, 'read', handlers.create)
  set(context, 'update', handlers.create)
  set(context, 'delete', handlers.create)

  //
  return {
    context,
    ...handlers
  }
}

//
export default async function (config: any = {}) {
  // default plugins
  const plugins = [
    withDefinitions,
    withControllers,
    ...config.plugins
  ]

  // core api
  const api = core(config)

  // core api with plugins
  return injectPlugins(plugins, api)
}
