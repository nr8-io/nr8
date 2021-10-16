import 'mocha'
import { expect } from 'chai'

//
import nr8 from '@nr8/core'

//
import { controllers, definitions } from './index'

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
