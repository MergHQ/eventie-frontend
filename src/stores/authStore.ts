import Bacon from 'baconjs'
import { actionStream, sendAction } from '../utils/actionDispatcher'
import { updateLoginCreds, login, toggleEventModalAction, fetchUserDetails } from '../utils/actions'
import { loginUser } from '../services/authService'

export default function authStore(): Bacon.Property<any, {username: string, password: string}> {
  const updateCredsS = actionStream(updateLoginCreds)
  const loginS = actionStream(login)
  const credsP = Bacon.update({username: '', password: ''}, 
    [updateCredsS], (iv, nv) => ({...iv, ...nv})
  )

  // Do something with this stream
  const authReqS = credsP
    .sampledBy(loginS)
    .flatMapLatest(loginRequest)

  const authReqResS = authReqS
    .doAction(({access_token}) => tokenToLocalStorage(access_token))
    .doAction(() => sendAction(fetchUserDetails, null))
    .doAction((() => sendAction(toggleEventModalAction, {id: 'login', isOpen: true})))

  
  return Bacon.update({username: '', password: ''},
    [updateCredsS], (iv, nv) => ({...iv, ...nv}),
    [authReqS], (iv, _) => ({...iv}),
    [authReqResS], (iv, _) => ({...iv})
  )
}

function loginRequest(creds: {username: string, password: string}): Bacon.EventStream<any, {access_token: string}> {
  return Bacon.fromPromise(loginUser(creds))
}

function tokenToLocalStorage(accessToken: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('eventie_token', accessToken)
  }
}