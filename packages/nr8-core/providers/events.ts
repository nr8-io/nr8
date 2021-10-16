import EventEmitter from 'events'

//
import defaultEventsAdaptor from '../adaptors/default-events'

//
export const eventListeners = {}

// @TODO allow extension of events to pubsub etc
export default function (adaptor = defaultEventsAdaptor()) {
  const ee = new EventEmitter()

  ee.setMaxListeners(0)

  // @TODO add cluster ee adaptor

  return ee
}
