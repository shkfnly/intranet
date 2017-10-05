import { FETCH_PROFILE, FETCH_PROFILES, SELECT_PROFILE, STORE_PROFILES } from '../constants/ProfileActionTypes'

export function fetchProfile (address) {
  return {
    type: FETCH_PROFILE,
    address
  }
}
export function fetchProfiles () {
  return {
    type: FETCH_PROFILES
  }
}

export function selectProfile (profile) {
  return {
    type: SELECT_PROFILE,
    profile
  }
}
export function storeProfiles (profiles) {
  return {
    type: STORE_PROFILES,
    profiles
  }
}
