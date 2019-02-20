import Bacon from 'baconjs'
import { actionStream } from '../utils/actionDispatcher'
import { fetchUserDetails } from '../utils/actions'
import { fetchUser } from '../services/userService'

// TODO: Resolve from initial state
export default function userStore() {
  const fetchUserDetailsS = actionStream(fetchUserDetails)

  const fetchUserDetailsRequestS = fetchUserDetailsS
    .flatMapLatest(fetchUserRequest)

  return Bacon.update({loggedUser: {}, isLoading: true},
    [fetchUserDetailsS], (iv, _) => ({...iv, isLoading: true}),
    [fetchUserDetailsRequestS], (_, nv) => ({isLoading: false, loggedUser: nv})
  )
}

function fetchUserRequest() {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('eventie_token')
    return Bacon.fromPromise(fetchUser(token))
  }
}