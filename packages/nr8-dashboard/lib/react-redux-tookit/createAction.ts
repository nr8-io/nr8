import { Reducer } from 'redux'
import { createHook, CreateHookOptions, PrepareAction } from './createHook'

//
export const createPreparedAction = (
  type: string,
  prepare?: PrepareAction<any>,
  reducer?: Reducer,
  initialState?: ((state: any) => any) | object | string | number
) => {
  const options: CreateHookOptions = {
    type,
    prepare,
    reducer,
    initialState
  }

  //
  const useHook = createHook(options)

  //
  return () => {
    const [, dispatch] = useHook()

    return dispatch
  }
}

//
export const createAction = (
  type: string,
  reducer?: Reducer,
  initialState?: ((state: any) => any) | object | string | number
) => {
  const options: CreateHookOptions = {
    type,
    reducer,
    initialState
  }

  //
  const useHook = createHook(options)

  //
  return () => {
    const [, dispatch] = useHook()

    return dispatch
  }
}
