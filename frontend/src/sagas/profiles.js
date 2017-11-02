import { all, put, takeEvery } from 'redux-saga/effects'
// import { push } from 'react-router-redux'
import { FETCH_PROFILE, FETCH_PROFILES, SAVE_PROFILE } from '../constants/ProfileActionTypes'
import { selectProfile, storeProfiles } from '../actions/profileActions'
import { loggedInUser } from '../actions/userActions'

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
      // console.log(profileArr)
      profiles = profilesArr
      console.log(profiles)
    })
  yield put(storeProfiles(profiles))
}

function* fetchProfile (action) {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let profile = {}
  yield fetch(`/api/profile?address=${action.address}`, config)
    .then((response) => response.json())
    .then((profileResponse) => {
      profile = profileResponse
      console.log(profile)
    })
  yield put(selectProfile(profile))
}

function* saveProfile (action) {
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.profile)
  }
  let returnedProfile
  yield fetch(`/api/save?address=${action.address}`, config)
    .then((response) => response.json())
    .then((user) => {
      returnedProfile = user
    })
  yield put(loggedInUser(returnedProfile))
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
    takeEvery(FETCH_PROFILE, fetchProfile),
    takeEvery(FETCH_PROFILES, fetchProfiles),
    takeEvery(SAVE_PROFILE, saveProfile)
    // takeEvery(REGISTER_USER, registerUser)
  ])
}

export default userSaga
