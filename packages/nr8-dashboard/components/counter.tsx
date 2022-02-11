import type { NextPage } from 'next'
import { initialState, useStateIn, createHook } from '../lib/react-redux-tookit'

//
export const useIncrement = createHook({
  type: 'counter/increment',
  initialState: {
    counter: {
      value: 0
    }
  },
  prepare: (name: string) => {
    return {
      payload: {
        name
      }
    }
  },
  reducer: (state: any) => {
    return {
      ...state,
      counter: {
        value: state.counter.value + 1
      }
    }
  }
})

//
export const useDecrement = createHook({
  type: 'counter/decrement',
  initialState: {
    counter: {
      name: 'counter'
    }
  },
  reducer: (state: any) => {
    return {
      ...state,
      counter: {
        value: state.counter.value - 1
      }
    }
  }
})

initialState({
  counter: {
    type: 'something else'
  }
})

const Counter: NextPage = () => {
  const count = useStateIn('counter.value')
  const increment = useIncrement()
  const decrement = useDecrement()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => increment('something')}
        >
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => decrement()}>
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter
