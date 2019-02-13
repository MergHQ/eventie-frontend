import Bacon from 'baconjs'
import { actionStream, sendAction } from '../utils/actionDispatcher'
import { updateNewEventFormData, submitFormDataAction, toggleEventModalAction } from '../utils/actions'
import { Event } from '../types/InitialState'
import Axios from 'axios'

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
  const requestPromise = Axios.post('http://localhost:4200/api/events', formData)
    .then(response => response.data)
  return Bacon.fromPromise(requestPromise)
}