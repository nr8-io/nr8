import { Reducer } from 'redux'
import { createHook, CreateHookOptions } from './createHook'

//
export const createMutation = (
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

export default createMutation
