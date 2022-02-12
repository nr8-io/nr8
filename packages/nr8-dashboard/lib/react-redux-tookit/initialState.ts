import createNextState, { isDraftable } from 'immer'
import merge from 'lodash/merge'

//
let state: any = {}

//
export const initialState = (stateOrReducer: any) => {
  state = createNextState(state, (draftState: any) => {
    if (typeof stateOrReducer === 'function') {
      return stateOrReducer(draftState)
    } else {
      merge(draftState, stateOrReducer)
    }
  })
  console.log(state)
}

//
export default function () {
  return state
}
