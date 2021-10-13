import async from 'async'
import path from 'path'
import { get } from 'lodash/fp'

//
import create from './commands/create'

//
import eventsProvider from './providers/events'
import queueProvider from './providers/queue'
import storageProvider from './providers/storage'

//
import { loadPath } from './helpers/filesystem'

// config
export default function (userConfig: any = {}) {
  const defaultResources = loadPath(path.join(__dirname, 'resources'))

  //
  const config = {
    apiVerison: 'nr8.io/v1alpha',
    storage: storageProvider(userConfig.storage),
    events: eventsProvider(userConfig.events),
    queue: queueProvider(userConfig.queue),
    resources: [],
    ...userConfig,
    intializing: false,
    ready: false
  }

  //
  const { apiVerison, events, storage, queue } = config

  // default command context
  const defaultContext = {
    apiVerison,
    storage,
    events,
    queue,
    exec
  }

  events.setMaxListeners(0)

  // load default resources
  async function init () {
    if (!config.ready && !config.intializing) {
      config.intializing = true

      await async.eachSeries([...defaultResources, ...config.resources], async (object) => {
        return create.apply(defaultContext, [object])
      })

      // ready for commands
      config.intializing = false
      config.ready = true

      events.emit('init')
    }
  }

  // wrap functions that auto init nr8 api
  function onReady (fn) {
    return async (...args) => {
      if (!config.ready) {
        await init()
      }

      return fn(...args)
    }
  }

  // execute command
  async function exec (name, ...args) {
    const spec = await storage.get(`/commands/${name}`)

    if (spec) {
      const handler = get('spec.handler', spec)

      if (handler.type === 'node') {
        const module = require(handler.path)

        //
        const result = await module[handler.subPath || 'default'].apply(defaultContext, args)

        // @TODO hooks

        return result
      } else {
        throw Error('command handler type not supported')
      }
    } else {
      throw Error('command not found')
    }
  }

  //
  return {
    init,
    onReady,
    exec: onReady(exec),
    $storage: storage,
    $events: events,
    $queue: queue
  }
}
