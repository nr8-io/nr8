import { get } from 'lodash/fp'

//
import create from './api/create'
import read from './api/read'

//
import eventsProvider from './providers/events'
import logProvider from './providers/log'
import queueProvider from './providers/queue'
import storageProvider from './providers/storage'

// config
export default function (userConfig: any = {}) {
  const config = { ...userConfig }

  //
  const context = {
    events: eventsProvider(config.eventsAdaptor),
    log: logProvider(config.logAdaptor),
    queue: queueProvider(config.queueAdaptor),
    storage: storageProvider(config.storageAdaptor)
  }

  return {
    create: (resource) => create.apply(context, resource),
    read: (plural, index) => create.apply(context, [plural, index])
  }
}
