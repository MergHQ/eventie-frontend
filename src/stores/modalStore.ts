import Bacon from 'baconjs'
import {actionStream} from '../utils/actionDispatcher'
import {toggleEventModalAction, setRegistrationView} from '../utils/actions'

export default function modalStore() {
  const toggleModalS = actionStream(toggleEventModalAction)
    .log()
  const setRegistrationViewS = actionStream(setRegistrationView)
  return Bacon.update({id: '', isOpen: false, registrationOpen: false}, 
    [toggleModalS], (_, {id, isOpen, registrationOpen}: {id: string, isOpen: boolean, registrationOpen: boolean}) => {
      return ({id, isOpen: !isOpen, registrationOpen})
    },
    [setRegistrationViewS], (iv, nv) => ({...iv, registrationOpen: nv})
  )
}