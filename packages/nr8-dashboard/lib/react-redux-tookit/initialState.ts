import { merge } from 'lodash'

//
let state: any = {}

//
export const initialState = (stateOrReducer: any) => {
  if (stateOrReducer) {
    if (typeof stateOrReducer === 'function') {
      state = stateOrReducer(state)
    } else {
      state = merge(state, stateOrReducer)
    }
  }
}

//
export default function () {
  return state
}
