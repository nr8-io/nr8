import { useSelector } from 'react-redux'
import { get } from 'lodash/fp'

//
export const useStateIn = (path: string) => {
  return useSelector(get(path))
}

//
export { configureStore } from './configureStore'
export { createHook } from './createHook'
export { initialState } from './initialState'
export * from 'react-redux'
