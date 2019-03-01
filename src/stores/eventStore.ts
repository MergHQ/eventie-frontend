import Bacon from 'baconjs'
import { actionStream, sendAction } from '../utils/actionDispatcher'
import { updateNewEventFormData, submitFormDataAction, toggleEventModalAction, enrollToEvent, yoDawgHeardYouLikeModals } from '../utils/actions'
import { Event } from '../types/InitialState'
import { addEvent, enrollUserToEvent } from '../services/eventService'
import { User } from '../services/userService'
import * as R from 'ramda'

export default function eventStore(events: Event[]) {
  const formDataS = actionStream(updateNewEventFormData)
  const submitFormDataS = actionStream(submitFormDataAction)
  const enrollToEventS = actionStream(enrollToEvent)
  const formDataP = Bacon.update({}, 
    [formDataS], (inital, nv) => ({...inital, ...nv}),
  )

  const entrollToEventRequestS = enrollToEventS
    .flatMapLatest(enrollToEventRequest)

  const submitResultS = formDataP
    .sampledBy(submitFormDataS)
    .flatMapLatest(sendFormData)

  return Bacon.update({events, newEvent: {}}, 
    [formDataS], (initial, nv) => ({events: initial.events, newEvent: {...initial.newEvent, ...nv}}),
    [submitResultS], (iv, nv) => {
      const {events} = iv
      if ('error' in  nv) {
        sendAction(yoDawgHeardYouLikeModals, {isOpen: false, message: nv.error})
        return iv
      }
      // This modal is most likely open if the content is modified
      sendAction(toggleEventModalAction, {id: 'newEvent', isOpen: true})
      events.push(nv)
      return {events, newEvent: {}}
    },
    [entrollToEventRequestS], (iv, nv: {eventId: string, user: User} | {error: string}) => {
      if ('error' in nv) {
        sendAction(yoDawgHeardYouLikeModals, {isOpen: false, message: nv.error})
        return iv
      }
      const event = iv.events.find(({id}) => id === nv.eventId)
      if (event) {
        const eventIdx = iv.events.findIndex(({id}) => id === event.id)
        const {user} = nv
        event.participants.push({username: user.username, id: user.id})
        return {...iv, events: R.pipe((events: Event[]) => R.reject(({id}) => id === nv.eventId, events), R.insert(eventIdx, event))(iv.events)}
      }
      return iv
    }
  )
}

function sendFormData(formData: Event) {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('eventie_token')
    if (!token) {
      return Bacon.fromPromise(Promise.reject({error: 'Not logged in'}))
    }

    return Bacon.fromPromise(addEvent(formData, token))
  }
}

function enrollToEventRequest(eventId: string): Bacon.EventStream<{}, {eventId: string, user: User} | {error: string}> {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('eventie_token')
    if (!token) {
      return Bacon.fromPromise(Promise.reject({error: 'Not logged in'}))
    }

    return Bacon.fromPromise(enrollUserToEvent(eventId, token))
  }
}
