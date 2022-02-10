import type { NextPage } from 'next'
import { initialState, useStateIn, createAction } from '../providers/redux'

//
export const useIncrement = createAction('counter/increment', (state: any) => {
  return {
    ...state,
    counter: {
      value: state.counter.value + 1
    }
  }
})

//
export const useDecrement = createAction('counter/decrement', (state: any) => {
  return {
    ...state,
    counter: {
      value: state.counter.value - 1
    }
  }
})

//
initialState({
  counter: {
    value: 0
  }
})

const Counter: NextPage = () => {
  const count = useStateIn('counter.value')
  const increment = useIncrement()
  const decrement = useDecrement()

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => increment()}>
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
