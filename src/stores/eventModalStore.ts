import Bacon from 'baconjs'
import {actionStream} from '../utils/actionDispatcher'
import {toggleEventModalAction} from '../utils/actions'

export default function eventModalStore() {
  const toggleModalS = actionStream(toggleEventModalAction)
    .log()
  return Bacon.update({id: '', isOpen: false}, 
    [toggleModalS], (_, {id, isOpen}: {id: string, isOpen: boolean}) => {
      return ({id, isOpen: !isOpen})
    }
  )
}