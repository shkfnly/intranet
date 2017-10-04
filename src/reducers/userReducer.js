import { LOGGED_IN_USER } from '../constants/UserActionTypes'

const initialState = {
  user: {}
}

function userReducer (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
    case LOGGED_IN_USER:
      return Object.assign({}, state, {user: action.userObj})
    default:

  }
  return state
}

export default userReducer
