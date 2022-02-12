import type { NextPage } from 'next'
import set from 'lodash/set'
import {
  initialState,
  createAction,
  createMutation,
  createState,
  useSelector
} from '../lib/react-redux-tookit'

//
export const useIncrement = createMutation('counter incremented', (state) => {
  state.counter.name = 'increment'
  state.counter.value++
})

//
export const useDecrement = createMutation('counter decremented', (state) => {
  state.counter.name = 'decremented'
  state.counter.value--
})

export const useLogin = createAction(
  'user logged in',
  (username: string, password: string) => {
    return {
      payload: { username, password }
    }
  },
  (state, action) => set(state, 'user', action.payload),
  { user: {} }
)

//
export const useCounterName = createState(
  'counter name changed',
  'counter.name',
  'default'
)

//
initialState({
  counter: {
    value: 0
  }
})

const Counter: NextPage = () => {
  const count = useSelector('counter.value')
  const [counterName, setCounterName] = useCounterName()
  const increment = useIncrement()
  const decrement = useDecrement()
  const login = useLogin()

  return (
    <div>
      <div>
        <h1>{counterName}</h1>
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
            setCounterName('default')
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
