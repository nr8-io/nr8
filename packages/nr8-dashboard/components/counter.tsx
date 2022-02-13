import type { NextPage } from 'next'
import set from 'lodash/set'
import {
  initialState,
  createAction,
  createMutation,
  createState,
  useSelector,
  createReducer
} from '@nr8/react-redux'

// type map
export const types = {
  incr: 'counter incremented',
  decr: 'counter decremented',
  name: 'counter name changed',
  login: 'user logged in'
}

// incrment the counter
export const useIncrement = createMutation(types.incr, (state) => {
  state.counter.name = 'increment'
  state.counter.value++
})

// decrement the counter
export const useDecrement = createMutation(types.decr, (state) => {
  state.counter.name = 'decremented'
  state.counter.value--
})

// prepated action example with mutation
export const useLogin = createAction(
  types.login,
  (username: string, password: string) => ({
    payload: { username, password }
  })
)

createReducer(types.login, (state, action) =>
  set(state, 'user', action.payload)
)

// example setter/getter action like useState
export const useName = createState(types.name, 'counter.name', 'default')

//
initialState({
  counter: {
    value: 0
  }
})

const Counter: NextPage = () => {
  const count = useSelector('counter.value')
  const [name, setName] = useName()
  const increment = useIncrement()
  const decrement = useDecrement()
  const login = useLogin()

  return (
    <div>
      <div>
        <h1>{name}</h1>
        <button
          aria-label="Increment value"
          onClick={() => {
            increment('increment')
          }}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => {
            decrement('decrement')
          }}
        >
          Decrement
        </button>
        <br />
        <button
          aria-label="Decrement value"
          onClick={() => {
            setName('default')
          }}
        >
          Reset name
        </button>
        <br />
        <button
          aria-label="Decrement value"
          onClick={() => {
            login('michael', 'password')
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Counter
