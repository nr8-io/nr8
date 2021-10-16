import { find, get } from 'lodash'

//
import { condition } from './condition'

//
export function matchRouter (routers, object) {
  for (let i = 0; i < routers.length; i++) {
    const policies = get(routers[i], 'spec.policies')
    const policy = find(policies, (v: any) => condition(v.when, object))

    if (policy) {
      return [routers[i], policy]
    }
  }

  return []
}
