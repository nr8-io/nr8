import EventEmitter from 'events'

//
export const eventListeners = {}

// @TODO allow extension of events to pubsub etc
export default function (config = {}) {
  return new EventEmitter()
}
