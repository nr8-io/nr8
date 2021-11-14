import jmespath from '@daz.is/jmespath'
import { curry, get, getOr } from 'lodash/fp'

//
const search = jmespath.decorate({
  get: {
    _func: ([path, object]) => get(path, object),
    _signature: [
      { types: [jmespath.types.TYPE_NUMBER, jmespath.types.TYPE_STRING] },
      { types: [jmespath.types.TYPE_OBJECT] }
    ]
  },
  getOr: {
    _func: ([value, path, object]) => getOr(value, path, object),
    _signature: [
      {
        types: [
          jmespath.types.TYPE_NUMBER,
          jmespath.types.TYPE_STRING,
          jmespath.types.TYPE_OBJECT,
          jmespath.types.TYPE_ARRAY
        ]
      },
      { types: [jmespath.types.TYPE_NUMBER, jmespath.types.TYPE_STRING] },
      { types: [jmespath.types.TYPE_OBJECT] }
    ]
  }
})

//
export default curry((expr, data) => {
  return search(expr)(data || {})
})
