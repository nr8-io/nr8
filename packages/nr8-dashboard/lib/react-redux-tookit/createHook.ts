import { Reducer } from 'redux'
import { useDispatch } from 'react-redux'
import { merge } from 'lodash'

//
import { exactMatch } from './reducer'
import { initialState } from './initialState'

/**
 * A "prepare" method to be used as the second parameter of `createAction`.
 * Takes any number of arguments and returns a Flux Standard Action without
 * type (will be added later) that *must* contain a payload (might be undefined).
 *
 * @public
 */
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
interface CreateHookOptions {
  type: string
  matcher?: RegExp
  initialState?: any
  prepare?: PrepareAction<any>
  reducer?: Reducer
}

export const createHook = (options: CreateHookOptions) => {
  const { type, prepare = prepareAction, reducer, matcher } = options

  //
  if (options.initialState) {
    initialState(options.initialState)
  }

  //
  if (!matcher && typeof reducer === 'function') {
    exactMatch(type, reducer)
  }

  //
  return () => {
    const dispatch = useDispatch()

    return (...args: any[]) => {
      dispatch({ ...prepare(...args), type })
    }
  }
}
