import { SELECT_PROFILE, STORE_PROFILES } from '../constants/ProfileActionTypes'

const initialState = {
  profiles: [],
  profile: {}
}

export default function profileReducer (state = initialState, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
    case STORE_PROFILES:
      var profiles = Object.assign({}, state, {profiles: action.profiles})
      return profiles
    case SELECT_PROFILE:
      var obj = Object.assign({}, state, {profile: action.profile})
      return obj
    default:
  }
  return state
}
