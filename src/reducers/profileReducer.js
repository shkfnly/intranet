import { STORE_PROFILES } from '../constants/ProfileActionTypes'

const initialState = {
  profiles: []
}

export default function profileReducer (state = initialState, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
    case STORE_PROFILES:
      return Object.assign({}, state, {profiles: action.profiles})
    default:

  }
  return state
}
