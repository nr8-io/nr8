import { every, get, some } from 'lodash'

//
const when = {
  and: (expr, object) => {
    const and = expr.filter((v) => !v.or)
      .map((v) => condition(v, object))

    const or = expr.filter((v) => v.or)
      .map((v) => condition(v, object))

    return every(and) || some(or)
  },
  or: (expr, object) => {
    const or = expr.filter((v) => !v.and)
      .map((v) => condition(v, object))

    const and = expr.filter((v) => v.and)
      .map((v) => condition(v, object))

    return some(or) && every(and)
  },
  equals: (expr, value) => {
    return (expr === value)
  },
  matches: (expr, value) => {
    return new RegExp(`${expr}`).test(value)
  }
}

//
function keyValueOrExpr (object) {
  const k = Object.keys(object)[0]
  return [k, object[k]]
}

//
function pathAndArgs (cond) {
  const [selector, valueOrCond] = keyValueOrExpr(cond)
  const path = selector.split('.')

  if (typeof valueOrCond === 'object') {
    const [key, value] = keyValueOrExpr(valueOrCond)
    return [[...path, key], value]
  }

  return [path, valueOrCond]
}

//
export function condition (cond, object) {
  const [method, expr] = keyValueOrExpr(cond)
  const [path, args] = pathAndArgs(expr)

  //
  const value = get(object, path)

  switch (method) {
    case 'and':
      return when.and(expr, object)
    case 'or':
      return when.or(expr, object)
    case 'not':
      return !condition(expr, object)
    case 'matches':
      return when.matches(args, value)
    case 'equals':
      return when.equals(args, value)
  }
}
