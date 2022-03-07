import { isDraft } from 'immer'
import { AnyObject } from 'immer/dist/internal'

//
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import set from 'lodash/set'
import merge from 'lodash/merge'

//
import { createHook, CreateHookOptions } from './createHook'

//
export const createState = (
  type: string,
  selector?: ((state: any) => any) | string,
  initialState?: ((state: any) => any) | object | string | number
) => {
  //
  const reducer = (state: any, action: any) => {
    const { payload } = action

    if (typeof selector === 'function') {
      const target = selector(state)

      if (!isDraft(target)) {
        throw Error('non string selectors can only update objects')
      }

      if (!isObject(payload)) {
        throw Error('non string selectors can only update with objects')
      }

      merge(target, payload)
    } else if (typeof selector === 'string') {
      if (isObject(payload)) {
        const target = get(state, selector)

        if (!isDraft(target)) {
          throw Error('expected target to be draftable')
        }

        merge(target, payload)
      } else {
        set(state, selector, payload)
      }
    }
  }

  //
  const options: CreateHookOptions = {
    type,
    selector,
    reducer,
    initialState
  }

  //
  if (typeof selector === 'string') {
    options.initialState = (state: any) => {
      let nextState = initialState

      if (typeof initialState === 'function') {
        nextState = initialState(get(state, selector))
      }

      if (nextState) {
        set(state, selector, nextState)
      }
    }
  }

  //
  return createHook(options)
}

export default createState
