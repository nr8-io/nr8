//
export function defaultQueueAdaptor () {
  const topics = {}

  //
  function watcher (queue, consumer) {
    let running = false

    //
    async function process () {
      if (!running) {
        running = true

        while (queue.length > 0) {
          await consumer(queue.shift())
        }

        running = false
      }
    }

    //
    Object.defineProperty(queue, 'push', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: function (...args) {
        const result = Array.prototype.push.apply(this, args)

        if (!running) {
          process()
        }

        return result
      }
    })

    //
    return {
      process
    }
  }

  //
  async function assertQueue (topic) {
    if (!topics[topic]) {
      topics[topic] = []
    }

    return topics[topic]
  }

  //
  async function publish (topic, object) {
    const queue = await assertQueue(topic)

    queue.push(object)
  }

  //
  async function subscribe (topic, consumer) {
    const queue = await assertQueue(topic)

    watcher(queue, consumer)
  }

  return {
    publish,
    subscribe
  }
}

//
export default function (adaptor = defaultQueueAdaptor()) {
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
