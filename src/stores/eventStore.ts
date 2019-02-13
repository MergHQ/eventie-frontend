import Bacon from 'baconjs'
import { actionStream, sendAction } from '../utils/actionDispatcher'
import { updateNewEventFormData, submitFormDataAction, toggleEventModalAction } from '../utils/actions'
import { Event } from '../types/InitialState'
import { addEvent } from '../services/eventService';

export default function eventStore(events: Event[]) {
  const formDataS = actionStream(updateNewEventFormData)
  const submitFormDataS = actionStream(submitFormDataAction)
  const formDataP = Bacon.update({}, 
    [formDataS], (inital, nv) => ({...inital, ...nv}),
  )

  const submitResultS = formDataP
    .sampledBy(submitFormDataS)
    .flatMapLatest(sendFormData)


  return Bacon.update({events, newEvent: {}}, 
    [formDataS], (initial, nv) => ({events: initial.events, newEvent: {...initial.newEvent, ...nv}}),
    [submitResultS], ({events}, nv) => {
      // This modal is most likely open if the content is modified
      sendAction(toggleEventModalAction, {id: 'newEvent', isOpen: true})
      events.push(nv)
      return {events, newEvent: {}}
    }
  )
}

function sendFormData(formData: Event) {
  return Bacon.fromPromise(addEvent(formData))
}