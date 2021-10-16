import 'mocha'
import { expect } from 'chai'

//
import { trace } from './providers/log'

//
import nr8 from './index'

//
describe('core', async () => {
  const api = nr8({
    resources: [{
      type: 'Controller',
      metadata: {
        name: 'test'
      }
    }]
  })

  await api.init()

  //
  it('should have a definition named definitions.nr8.io', async function () {
    const definition = await api.read('definition', 'definitions.nr8.io')

    trace(definition)

    expect(definition).to.be.an('object')
    expect(definition).to.have.nested.property('metadata.name')
    expect(definition).nested.property('metadata.name').to.eq('definitions.nr8.io')
  })

  //
  it('should have a definition named controllers.nr8.io', async function () {
    const definition = await api.read('definition', 'controllers.nr8.io')

    trace(definition)

    expect(definition).to.be.an('object')
    expect(definition).to.have.nested.property('metadata.name')
    expect(definition).nested.property('metadata.name').to.eq('controllers.nr8.io')
  })

  //
  it('should have a controller named test', async function () {
    const controller = await api.read('controller', 'test')

    trace(controller)

    expect(controller).to.be.an('object')
    expect(controller).to.have.nested.property('metadata.name')
    expect(controller).nested.property('metadata.name').to.eq('test')
  })
})
