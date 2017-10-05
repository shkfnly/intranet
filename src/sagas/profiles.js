import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
// import { push } from 'react-router-redux'
import { FETCH_PROFILES } from '../constants/ProfileActionTypes'
import { storeProfiles } from '../actions/profileActions'
import * as _ from 'lodash'

function* fetchProfiles () {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let profiles = []
  yield fetch('/api/profiles', config)
    .then((response) => response.json())
    .then((profilesArr) => {
      profiles = profilesArr
    })
  yield put(storeProfiles(profiles))
}
// function* loginUser (action) {
//   const credentials = action.credentials
//   let config = {
//     method: 'GET',
//     headers: new Headers(),
//     mode: 'cors',
//     cache: 'default'
//   }
//   let userObj = {}
//   yield fetch(`/api/login?address=${credentials.address}&pubkey=${credentials.publicKey}`, config)
//     .then((response) => response.json())
//     .then((user) => {
//       userObj = user
//     })
//   yield _.isEmpty(userObj)
//       ? registerUser(credentials)
//       : put(loggedInUser(userObj))
//   yield put(push('/edit'))
// }

// function* registerUser (credentials) {
//   // reaches here
//   let config = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   }
//   yield fetch('/api/register', config)
//     .then((response) => response.json())
//     .then((user) => {
//       console.log(user)
//       put(loggedInUser(user))
//     })
//     // Reaches here
//   // yield console.log('these nuts')
// }

function* userSaga () {
  yield all([
    takeEvery(FETCH_PROFILES, fetchProfiles)
    // takeEvery(REGISTER_USER, registerUser)
  ])
}

export default userSaga
