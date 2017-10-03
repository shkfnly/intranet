const initialState = {
  route: '/'
}

function navigationReducer (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}

export default navigationReducer
