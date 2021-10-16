import 'mocha'
import { expect } from 'chai'
import { get } from 'lodash/fp'

import nr8 from './index'

// definitions
import ResourceDefinition from 'definintions/ResourceDefinition'
import Controller from 'definintions/Controller'

//
describe('exec', () => {
  it('should do something', async function () {
    const core = nr8()

    await core.create(ResourceDefinition)
    await core.create(Controller)

    const result = await core.read('definitions')

    console.log('res1', result)

    expect(1).to.eq(1)
  })
})
