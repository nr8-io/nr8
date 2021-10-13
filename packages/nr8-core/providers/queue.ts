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

export default function (config = {}) {
  const topics = {}

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
    subscribe,
    $queue: topics
  }
}
