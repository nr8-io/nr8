// core api
import create from 'core/create'
import read from 'core/read'

// default definitions
import ResourceDefinition from 'definintions/ResourceDefinition'
import Controller from 'definintions/Controller'

// providers
import eventsProvider from 'providers/events'
import queueProvider from 'providers/queue'
import storageProvider from 'providers/storage'

//
export default function (userConfig: any = {}) {
  const config = { ...userConfig }

  //
  const context = {
    events: eventsProvider(config.eventsAdaptor),
    queue: queueProvider(config.queueAdaptor),
    storage: storageProvider(config.storageAdaptor)
  }

  //
  function withContext (fn) {
    return async (...args) => {
      return fn.apply(context, args)
    }
  }

  //
  return {
    create: withContext(create),
    read: withContext(read)
  }
}
