import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { LOGIN_USER } from '../constants/UserActionTypes'
function* loginUser (credentials) {
  console.log('you made it', credentials)
  yield put(push('/edit'))
}

function* userSaga () {
  yield all([
    takeEvery(LOGIN_USER, loginUser)
  ])
}

export default userSaga
