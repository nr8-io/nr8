import 'mocha'
import { expect } from 'chai'
import { set } from 'lodash'
import { join } from 'path'

//
import nr8 from '@nr8/core'
import { loadFile as yaml } from '@nr8/lib-yaml'

//
export const definitions = [
  yaml(__dirname, 'definitions/actions.yaml'),
  yaml(__dirname, 'definitions/events.yaml'),
  yaml(__dirname, 'definitions/features.yaml'),
  yaml(__dirname, 'definitions/queries.yaml'),
  yaml(__dirname, 'definitions/requests.yaml'),
  yaml(__dirname, 'definitions/requests.yaml'),
  yaml(__dirname, 'definitions/responses.yaml'),
  yaml(__dirname, 'definitions/routers.yaml'),
  yaml(__dirname, 'definitions/services.yaml')
]

//
export const controllers = [
  yaml(__dirname, 'controllers/gateway.yaml')
]

//
set(controllers, '0.spec.hooks.create.handler.path', join(__dirname, './handlers/requests'))
set(controllers, '0.spec.eventListeners.0.handler.path', join(__dirname, './handlers/requests'))

//
describe('gateway', async () => {
  const api = nr8({
    resources: [
      ...controllers,
      ...definitions
    ]
  })

  await api.init()

  it('should just work', async function () {
    const result = await api.read('definitions')
    console.log(result)
    expect(1).to.equal(1)
  })
})
