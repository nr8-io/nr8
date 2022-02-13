import { Reducer } from 'redux'
import { createHook, CreateHookOptions, PrepareAction } from './createHook'

//
export const createAction = (
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
