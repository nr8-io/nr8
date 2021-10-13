import 'mocha'
import { expect } from 'chai'

import nr8 from './index'

//
describe('exec', () => {
  it('should do something', async function () {
    const core = nr8()
    core.exec('read', 'banana')
    expect(1).to.equal(1)
  })
})
