import { Reducer } from 'redux'
import { createHook, CreateHookOptions } from './createHook'

//
export const createReducer = (
  typeOrMatcher: string | RegExp,
  reducer: Reducer,
  initialState?: ((state: any) => any) | object | string | number
) => {
  const createHookOptions: CreateHookOptions = {
    reducer,
    initialState
  }

  if (typeof typeOrMatcher === 'string') {
    createHookOptions.type = typeOrMatcher
  } else if (typeof typeOrMatcher?.test === 'function') {
    createHookOptions.matcher = typeOrMatcher
  }

  createHook(createHookOptions)
}
