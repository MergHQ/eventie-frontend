import Bacon from 'baconjs'
import { actionStream, sendAction } from '../utils/actionDispatcher'
import { fetchUserDetails, updateUserRegistrationFormData, setRegistrationView, submitNewUserData } from '../utils/actions'
import { fetchUser, UserRegistrationData, createUser } from '../services/userService'

// TODO: Resolve from initial state
export default function userStore() {
  const fetchUserDetailsS = actionStream(fetchUserDetails)
  const updateRegFormDataS = actionStream(updateUserRegistrationFormData)
  const createUserS = actionStream(submitNewUserData)
  const regFormDataP = Bacon.update({}, 
    [updateRegFormDataS], (iv, nv) => ({...iv, ...nv})   
  )

  const registrationRequest = regFormDataP
    .sampledBy(createUserS)
    .flatMapLatest(createUserRequest)

  const fetchUserDetailsRequestS = fetchUserDetailsS
    .flatMapLatest(fetchUserRequest)

  return Bacon.update({loggedUser: {}, isLoading: true, newUser: {}},
    [fetchUserDetailsS], (iv, _) => ({...iv, isLoading: true}),
    [fetchUserDetailsRequestS], (iv, nv) => ({...iv, isLoading: false, loggedUser: nv}),
    [updateRegFormDataS], (iv, nv) => ({...iv, newUser: {...iv.newUser, ...nv}}),
    [registrationRequest], (iv, nv) => {
      if (nv !== null) {
        sendAction(setRegistrationView, null)
      }
      return iv
    }
  )
}

function fetchUserRequest() {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('eventie_token')
    if (token === null) {
      console.log(token)
      return Bacon.fromPromise(Promise.resolve({}))
    }
    return Bacon.fromPromise(fetchUser(token))
  }
}

function createUserRequest(user: UserRegistrationData) {
  return Bacon.fromPromise(createUser(user))
}