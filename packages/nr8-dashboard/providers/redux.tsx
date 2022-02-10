import { FunctionComponent } from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import {
  useSelector as useReduxSelector,
  useDispatch,
  TypedUseSelectorHook,
  Provider as ReduxProvider
} from 'react-redux'
import { get } from 'lodash/fp'

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
const reducers: any = {}

//
const initialState = {
  counter: {
    value: 1
  }
}

//
export const store = createStore(
  (state = initialState, action) => {
    if (typeof reducers[action.type] === 'function') {
      return reducers[action.type](state, action)
    }

    return state
  },
  initialState,
  devTools
)

//
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

//
export const useStateIn = (path: string) => {
  return useSelector(get(path))
}

//
export const createAction = (type: string, reducer?: any) => {
  if (typeof reducer === 'function') {
    reducers[type] = reducer
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
  return <ReduxProvider store={store}>{children}</ReduxProvider>
}

export default Provider
