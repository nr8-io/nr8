import { loadFile as yaml } from '@nr8/yaml'
import { eachSeries } from 'async'
import { set } from 'lodash'

// core api
import create from './core/create'
import read from './core/read'
import update from './core/update'
import destroy from './core/destroy'

// providers
import eventsProvider from './providers/events'
import queueProvider from './providers/queue'
import storageProvider from './providers/storage'

// definitions
const controllers = yaml(__dirname, 'definitions/controllers.yaml')
const definiitions = yaml(__dirname, 'definitions/definitions.yaml')

//
export default function (userConfig: any = {}) {
  // config
  const config = {
    ...userConfig,
    resources: [
      controllers,
      definiitions,
      ...userConfig.resources || []
    ]
  }

  // default context
  const context = {
    events: eventsProvider(config.eventsAdaptor),
    queue: queueProvider(config.queueAdaptor),
    storage: storageProvider(config.storageAdaptor)
  }

  //
  let initialized = false

  function withContext (fn) {
    return (...args) => {
      if (initialized) {
        return fn(context, ...args)
      }

      throw new Error('nr8 core has not been initialized yet')
    }
  }

  // core api with configured context
  const api = {
    create: withContext(create),
    read: withContext(read),
    update: withContext(update),
    destroy: withContext(destroy)
  }

  set(context, 'api', api) // update context with api

  // init nr8 core by creating default resources
  async function init () {
    await eachSeries(config.resources, async (resource) => {
      return create(context, resource)
    })

    initialized = true
  }

  //
  return { init, context, ...api }
}
