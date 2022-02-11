import { Reducer } from 'redux'

//
let exact: any = {}
let regex: any = []

//
export const exactMatch = (type: string, reducer: Reducer) => {
  if (typeof reducer === 'function') {
    exact[type] = reducer
  } else {
    throw new Error('"reducer" is a required argument, and must be a function')
  }
}

//
export const regexMatch = (matcher: RegExp, reducer: Reducer) => {
  if (typeof reducer === 'function') {
    regex.push([matcher, reducer])
  } else {
    throw new Error('"reducer" is a required argument, and must be a function')
  }
}

//
export const createReducer = (reducer: Reducer<any, any>) => {
  const rootReducer: Reducer<any, any> = (state, action) => {
    const nextState = reducer(state, action)

    if (typeof exact[action.type] === 'function') {
      return exact[action.type](nextState, action)
    }

    return nextState
  }

  return rootReducer
}

//
export default createReducer
