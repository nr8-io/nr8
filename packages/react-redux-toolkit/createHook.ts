import { Reducer } from 'redux'
import { useDispatch } from 'react-redux'
import createNextState, { isDraftable } from 'immer'

//
import { exactMatch } from './reducer'
import { initialState } from './initialState'
import { useSelector } from './useSelector'

//
export type PrepareAction<P> =
  | ((...args: any[]) => { payload: P })
  | ((...args: any[]) => { payload: P; meta: any })
  | ((...args: any[]) => { payload: P; error: any })
  | ((...args: any[]) => { payload: P; meta: any; error: any })

//
const prepareAction = (payload: any) => {
  return {
    payload
  }
}

//
export interface CreateHookOptions {
  type?: string
  matcher?: RegExp
  initialState?: ((state: any) => any) | object | string | number
  selector?: string | ((state: any) => any)
  prepare?: PrepareAction<any>
  reducer?: Reducer
}

//
export const defaultSelector = (state: any) => state

//
export const createHook = (options: CreateHookOptions): (() => any) => {
  const {
    type,
    prepare = prepareAction,
    reducer,
    matcher,
    selector = defaultSelector
  } = options

  // update initial state from options
  if (options.initialState) {
    initialState(options.initialState)
  }

  // register matcher with root reducer
  if (type && typeof reducer === 'function') {
    const immerReducer = (previousState: any, action: any) => {
      // handle draftable state with immer
      if (isDraftable(previousState)) {
        return createNextState(previousState, (draftState: any) => {
          return reducer(draftState, action)
        })
      }

      // handle non dreaftable state
      const nextState = reducer(previousState, action)

      if (typeof nextState === 'undefined') {
        if (previousState === null) {
          return previousState
        }

        throw Error(
          'A case reducer on a non-draftable value must not return undefined'
        )
      }

      return nextState
    }

    exactMatch(type, immerReducer)
  }

  return () => {
    const dispatch = useDispatch()

    return [
      useSelector(selector),
      (...args: any[]) => {
        dispatch({ type, ...prepare(...args) })
      }
    ]
  }
}

export default createHook
