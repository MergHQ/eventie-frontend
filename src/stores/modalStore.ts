import Bacon from 'baconjs'
import {actionStream} from '../utils/actionDispatcher'
import {toggleEventModalAction, setRegistrationView, yoDawgHeardYouLikeModals} from '../utils/actions'

export default function modalStore() {
  const toggleModalS = actionStream(toggleEventModalAction)
    .log()
  const toggleErrorModalS = actionStream(yoDawgHeardYouLikeModals)
  const setRegistrationViewS = actionStream(setRegistrationView)
  return Bacon.update({id: '', isOpen: false, registrationOpen: false, errorModalOpen: false, errorModalMessage: ''}, 
    [toggleModalS], (_, {id, isOpen, registrationOpen, errorModalOpen, errorModalMessage}: {id: string, isOpen: boolean, registrationOpen: boolean, errorModalOpen: boolean, errorModalMessage: string}) => {
      return ({id, isOpen: !isOpen, registrationOpen, errorModalOpen, errorModalMessage})
    },
    [toggleErrorModalS], (iv, nv: {isOpen: boolean, message: string}) => ({...iv, errorModalOpen: !iv.errorModalOpen, errorModalMessage: nv.message}),
    [setRegistrationViewS], (iv, nv) => ({...iv, registrationOpen: nv})
  )
}