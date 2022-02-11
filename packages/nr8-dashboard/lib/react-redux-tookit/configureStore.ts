import {
  Action,
  AnyAction,
  Dispatch,
  Middleware,
  Reducer,
  ReducersMapObject,
  Store,
  StoreEnhancer,
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux'

//
import isPlainObject from './isPlainObject'
import { composeWithDevTools } from './devtoolsExtension'

//
import type { DispatchForMiddlewares, NoInfer } from './tsHelpers'
import type { EnhancerOptions as DevToolsOptions } from './devtoolsExtension'

//
import getInitialState from './initialState'
import getRootReducer from './reducer'

//
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

/**
 * Callback function type, to be used in `ConfigureStoreOptions.enhancers`
 *
 * @public
 */
export type ConfigureEnhancersCallback = (
  defaultEnhancers: readonly StoreEnhancer[]
) => StoreEnhancer[]

interface ConfigureStoreOptions<
  S = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = Middlewares<S>
> {
  /**
   * A single reducer function that will be used as the root reducer, or an
   * object of slice reducers that will be passed to `combineReducers()`.
   */
  reducer: Reducer<S, A> | ReducersMapObject<S, A>

  /**
   * An array of Redux middleware to install. If not supplied, defaults to
   * the set of middleware returned by `getDefaultMiddleware()`.
   */
  middleware?: M

  /**
   * Whether to enable Redux DevTools integration. Defaults to `true`.
   *
   * Additional configuration can be done by passing Redux DevTools options
   */
  devTools?: boolean | DevToolsOptions

  /**
   * The store enhancers to apply. See Redux's `createStore()`.
   * All enhancers will be included before the DevTools Extension enhancer.
   * If you need to customize the order of enhancers, supply a callback
   * function that will receive the original array (ie, `[applyMiddleware]`),
   * and should return a new array (such as `[applyMiddleware, offline]`).
   * If you only need to add middleware, you can use the `middleware` parameter instead.
   */
  enhancers?: StoreEnhancer[] | ConfigureEnhancersCallback
}

type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>

/**
 * A Redux store returned by `configureStore()`. Supports dispatching
 * side-effectful _thunks_ in addition to plain actions.
 *
 * @public
 */
export interface EnhancedStore<
  S = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = Middlewares<S>
> extends Store<S, A> {
  /**
   * The `dispatch` method of your store, enhanced by all its middlewares.
   *
   * @inheritdoc
   */
  dispatch: Dispatch<A> & DispatchForMiddlewares<M>
}

/**
 * A friendly abstraction over the standard Redux `createStore()` function.
 *
 * @param config The store configuration.
 * @returns A configured Redux store.
 *
 * @public
 */
export function configureStore<
  S = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = []
>(options: ConfigureStoreOptions<S, A, M>): () => EnhancedStore<S, A, M> {
  const {
    reducer = undefined,
    middleware = [],
    devTools = true,
    enhancers = undefined
  } = options || {}

  let combinedReducer: Reducer<S, A>

  if (typeof reducer === 'function') {
    combinedReducer = reducer
  } else if (isPlainObject(reducer)) {
    combinedReducer = combineReducers(reducer)
  } else {
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    )
  }

  if (!IS_PRODUCTION && middleware.some((item) => typeof item !== 'function')) {
    throw new Error(
      'each middleware provided to configureStore must be a function'
    )
  }

  const middlewareEnhancer = applyMiddleware(...middleware)

  let finalCompose = compose

  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: !IS_PRODUCTION,
      ...(typeof devTools === 'object' && devTools)
    })
  }

  let storeEnhancers: StoreEnhancer[] = [middlewareEnhancer]

  if (Array.isArray(enhancers)) {
    storeEnhancers = [middlewareEnhancer, ...enhancers]
  } else if (typeof enhancers === 'function') {
    storeEnhancers = enhancers(storeEnhancers)
  }

  const composedEnhancer = finalCompose(...storeEnhancers) as any

  // singleton store
  let store = null as any

  // allow delayed store creation to register actions
  return () => {
    if (store === null) {
      const preloadedState = getInitialState()
      const rootReducer = getRootReducer(combinedReducer)

      store = createStore(rootReducer, preloadedState, composedEnhancer)
    }

    return store
  }
}
