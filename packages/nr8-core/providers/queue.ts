import defaultQueue from '../adaptors/default-queue'

//
export default function (adaptor = defaultQueue()) {
  // get a single resource
  async function publish (topic, object) {
    adaptor.publish(topic, object)
  }

  // get a single resource
  async function subscribe (topic, consumer) {
    adaptor.subscribe(topic, consumer)
  }

  return {
    publish,
    subscribe
  }
}
