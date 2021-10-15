import EventEmitter from 'events'

//
export const eventListeners = {}

//
export function defaultEventsAdaptor () {
  return new EventEmitter()
}

// @TODO allow extension of events to pubsub etc
export default function (adaptor = defaultEventsAdaptor()) {
  return adaptor
}
