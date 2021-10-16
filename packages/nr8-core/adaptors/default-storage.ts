import { startsWith } from 'lodash/fp'

// simple in memory storage adaptor
export default function () {
  const cache = {}

  return {
    get: async (path: any) => {
      return cache[path]
    },
    set: async (path: any, val: any) => {
      cache[path] = val
      return val
    },
    del: async (path: any) => {
      delete cache[path]
    },
    lget: async (path: any) => {
      const keys = Object.keys(cache)
        .filter(startsWith(path))

      return keys.map((key) => cache[key])
    },
    keys: async () => {
      return Object.keys(cache)
    }
  }
}
