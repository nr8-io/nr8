import 'mocha'
import { expect } from 'chai'

import nr8 from './index'
import provider from 'definintions/Controller'

//
describe('exec', () => {
  it('should do something', async function () {
    const core = nr8()

    await core.create(provider)

    expect(1).to.be(1)
  })
})
