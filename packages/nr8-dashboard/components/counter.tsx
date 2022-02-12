import type { NextPage } from 'next'
import set from 'lodash/set'
import {
  initialState,
  createAction,
  createHook,
  createState,
  createReducer,
  useSelector
} from '../lib/react-redux-tookit'

//
export const useIncrement = createAction('counter incremented', (state) => {
  state.counter.name = 'increment'
  state.counter.value++
})

//
export const useDecrement = createAction('counter decremented', (state) => {
  state.counter.name = 'decremented'
  state.counter.value--
})

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
      </div>
    </div>
  )
}

export default Counter
