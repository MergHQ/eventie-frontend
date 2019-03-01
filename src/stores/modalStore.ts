import Bacon from 'baconjs'
import {actionStream} from '../utils/actionDispatcher'
import {toggleEventModalAction, setRegistrationView, yoDawgHeardYouLikeModals, setEditEventView} from '../utils/actions'

export default function modalStore() {
  const toggleModalS = actionStream(toggleEventModalAction)
    .log()
  const toggleErrorModalS = actionStream(yoDawgHeardYouLikeModals)
  const setRegistrationViewS = actionStream(setRegistrationView)
  const setEditEventViewS = actionStream(setEditEventView)
  return Bacon.update({id: '', isOpen: false, registrationOpen: false, errorModalOpen: false, errorModalMessage: '', eventEditVisible: false, eventEditVisibleId: ''}, 
    [toggleModalS], (_, {id, isOpen, registrationOpen, errorModalOpen, errorModalMessage, eventEditVisible, eventEditVisibleId}: {id: string, isOpen: boolean, registrationOpen: boolean, errorModalOpen: boolean, errorModalMessage: string, eventEditVisible: boolean, eventEditVisibleId: string}) => {
      return ({id, isOpen: !isOpen, registrationOpen, errorModalOpen, errorModalMessage, eventEditVisible, eventEditVisibleId})
    },
    [toggleErrorModalS], (iv, nv: {isOpen: boolean, message: string}) => ({...iv, errorModalOpen: !iv.errorModalOpen, errorModalMessage: nv.message}),
    [setRegistrationViewS], (iv, nv) => ({...iv, registrationOpen: nv}),
    [setEditEventViewS], (iv, nv: string) => ({...iv, eventEditVisible: !iv.eventEditVisible, eventEditVisibleId: nv})
  )
}