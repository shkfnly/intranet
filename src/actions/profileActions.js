import { FETCH_PROFILES, STORE_PROFILES } from '../constants/ProfileActionTypes'

export function fetchProfiles () {
  return {
    type: FETCH_PROFILES
  }
}

export function storeProfiles (profiles) {
  return {
    type: STORE_PROFILES,
    profiles
  }
}
