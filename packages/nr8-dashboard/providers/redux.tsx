import { FunctionComponent } from 'react'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider as ReduxProvider } from 'react-redux'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const Provider: FunctionComponent = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>
}

export default Provider
