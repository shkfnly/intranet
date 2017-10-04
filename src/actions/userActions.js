import { LOGIN_USER, REGISTER_USER } from '../constants/UserActionTypes'

export function registerUser (userObj) {
  return {
    type: REGISTER_USER,
    userObj
  }
}

export function loginUser (userObj) {
  return {
    type: LOGIN_USER,
    userObj
  }
}
