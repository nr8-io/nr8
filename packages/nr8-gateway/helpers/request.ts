import { find } from 'lodash'
import { get } from 'lodash/fp'

//
import { condition } from './condition'

//
export function matchRouter (routers, object) {
  for (let i = 0; i < routers.length; i++) {
    const policies = get('spec.policies', routers[i])
    const policy = find(policies, (v: any) => condition(v.when, object))

    if (policy) {
      return [routers[i], policy]
    }
  }

  return []
}
