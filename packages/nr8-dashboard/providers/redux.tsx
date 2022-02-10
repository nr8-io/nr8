import { FunctionComponent } from 'react'
import { createStore } from 'redux'
import {
  useSelector as useReduxSelector,
  useDispatch,
  TypedUseSelectorHook,
  Provider as ReduxProvider
} from 'react-redux'
import { get, merge } from 'lodash/fp'

//
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

//
const devTools =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f: any) => f

//
let __store__: any
let __reducers__: any = {}
let __initialState__: any = {}

//
export const initialState = (state: any) => {
  __initialState__ = merge(__initialState__, state)
}

//
export const getStore = () => {
  if (!__store__) {
    __store__ = createStore(
      (state = __initialState__, action) => {
        if (typeof __reducers__[action.type] === 'function') {
          return __reducers__[action.type](state, action)
        }

        return state
      },
      __initialState__,
      devTools
    )
  }

  return __store__
}

//
export const useSelector: TypedUseSelectorHook<any> = useReduxSelector

//
export const useStateIn = (path: string) => {
  return useSelector(get(path))
}

//
export const createAction = (type: string, reducer?: any) => {
  if (typeof reducer === 'function') {
    __reducers__[type] = reducer
  }

  return () => {
    const dispatch = useDispatch()

    return (payload?: any) => {
      dispatch({ type, payload })
    }
  }
}

//
export const Provider: FunctionComponent = ({ children }) => {
  return <ReduxProvider store={getStore()}>{children}</ReduxProvider>
}

export default Provider
