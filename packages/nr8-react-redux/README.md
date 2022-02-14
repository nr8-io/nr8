This is an extension of react-redux that adds utility similar to Redux Toolkit with
a twist.

All reducers use `immer`

# configureStore

Similar to redux toolkit but has no preloadedState, preloadedState should be added with
the initialState function or via one of hook creators instead.

A root reducer is also not required because reducers can be added via the hook creators
at any point of time before the store is initialized.

The biggest difference is configureStore returns a singleton constructor function
instead of the return value of `Redux.createStore` so it can be loaded after the hook
creators run.

eg. `store()` instead of `store` in these examples

### Redux Toolkit

```
const store = configureStore({ ... )

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
```

### @nr8/react-redux

```
const store = configureStore({ ... )

export default () => {
  return (
    <Provider store={store()}>
      <App />
    </Provider>
  )
}
```

`store()` will always return the same store after it is called the first time but
this one key distinction of lazy initializing the store at first render enables the
hook creators to register preloadedState and reducers automatically to reduce boiler
plate.

# createHook

main function for creating react-redux hooks, composes hooks from react-redux
and registers initialState and reducers.

- type: action type
- prepare: same as prepareAction in Redux Toolkit
- reducer: a reducer that will be called for the matching type of "matcher"
- matcher: a regex to test against action types, if matched the reducer will be run
  similar to React Toolkit Builder.addMatcher, if used createHook action dispatcher
  will be impotent. only one matcher or type should be
- selector: a selector use to return a value for the hook, detauls to (state) => state
  if not supplied, can be a string provided to Lodash.get() or a regular selector function.
- initialState: provides "preloadedState" to the store, can be provided as an object
  that will use Lodash.merge() to extend the current preloadedState or a Reducer
  function for adding to or manipulating the preloadedState passed to Redux.createStore
  before it is called

# createAction

like redux toolkit createAction but can take a reducer and initialState as additional
arguments, returns only the action dispatcher when used.

# createReducer

creates a reducer for a type/regex mater with some initialState, does not return
a react hook.

# createMutation

like createAction but does not have prepareAction as its second argument, a quicker
way for writing a simple action/reducer combo that doesn't need custom arguments
or uses only the first argument as payload, returns only the action dispatcher

# createState

utility function to simplify basic redux state manipulations as close to React.useState
as possible, takes a type, selector and initalState.

createState hooks returns [state, dispatcher] where state is the value provided by the
selector and dispatcher is an action for the supplied type, createState also creates
a reducer based on the selector which updates the state with the first parameter
supplied to the action dispatcher.

The selector can be a string path as used in Lodash.get/set or a standard selector function
however it is discouraged in favour of string paths because it supports more features.

If the selector is a string path the created reducer will update the value as expected
in all cases, the initialState will be scoped to the selector path and the initalState
can be a non object value such as a string or a number.

```
const useName = createState('counter name set', 'counter.name', 'default')

const MyComponent () => {
  const [name, setName] = useName()
  ...
}
```

In this example createState adds the preloadedState of `{ counter: { name: 'default' }}`
name will be 'default' and setName('something else') would change name to 'something else'
as expected.

Note: Because this library uses `immer` under the hood if a selector function is used
instead of a string path it must resolve an object and the parameter of the action dispatcher
must be an object that will be merged with the selector result, non object values will result in a error if used this way. If using a selector function initialState will have a global state
because it uses Lodash.get/set with the path selector to achieve this so createState is
really intended for use with a string path based selector.

# useRedux

Simple hook composition that combines useStore and useDispatch to return [store, dispatch]
instead of using two hooks

# useSelector

enhanced version of useSelector that accepts string paths and uses Lodash.get
under the hood to safely get nested values in additional to standard function selectors.

eg.

```
const MyComponent () => {
  cosnt counter = useSelector('counter.value')
  ...
}
```

# ideas

- configureStore constructor to take initialState for working with nextjs and providing
  initialState from SSR
- add reselect to keep parity with RTK
- change createReducer to accept a reducer without a type or matcher for custom reducers
  and interop with other redux ecosystem stuff
- readd preloadedState to configureStore for parity
- readd reducer to configureStore for parity and compose the reducers instead
- add composeReducers function for reducer composition instead of combineReducers
  that creates scoped reducers
