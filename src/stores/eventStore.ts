import Bacon from 'baconjs'
import { actionStream, sendAction } from '../utils/actionDispatcher'
import { updateNewEventFormData, submitFormDataAction, toggleEventModalAction, enrollToEvent, yoDawgHeardYouLikeModals, submitUpdatedEventData, setNewEvent, deleteEvent } from '../utils/actions'
import { Event } from '../types/InitialState'
import { addEvent, enrollUserToEvent, updateEvents, deleteEventDb } from '../services/eventService'
import { User } from '../services/userService'
import * as R from 'ramda'

export default function eventStore(events: Event[]) {
  const formDataS = actionStream(updateNewEventFormData)
  const submitFormDataS = actionStream(submitFormDataAction)
  const enrollToEventS = actionStream(enrollToEvent)
  const submitUpdatedEventDataS = actionStream(submitUpdatedEventData)
  const setNewEventS = actionStream(setNewEvent)
  const deleteEventS = actionStream(deleteEvent)
  const formDataP = Bacon.update({}, 
    [formDataS], (inital, nv) => ({...inital, ...nv}),
    [setNewEventS], (_, nv) => nv
  )

  const entrollToEventRequestS = enrollToEventS
    .flatMapLatest(enrollToEventRequest)

  const submitResultS = formDataP
    .sampledBy(submitFormDataS)
    .flatMapLatest(sendFormData)

  const eventDataUpdateRequestS = formDataP
    .sampledBy(submitUpdatedEventDataS, (propsVal, sampVal) => ({id: sampVal, event: propsVal}))
    .flatMapLatest(updateEventRequest)

  deleteEventS
    .flatMapLatest(deleteEventRequest)
    .onValue(() => window.location.reload())

  return Bacon.update({events, newEvent: {}}, 
    [formDataS], (initial, nv) => ({events: initial.events, newEvent: {...initial.newEvent, ...nv}}),
    [setNewEventS], (inital, nv) => ({...inital, newEvent: nv}),
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
    },
    [eventDataUpdateRequestS], (iv, nv: Event | {error: string}) => {
      if ('error' in nv) {
        sendAction(yoDawgHeardYouLikeModals, {isOpen: false, message: nv.error})
        return iv
      }

      const oldEventIDx = iv.events.findIndex(({id}) => id === nv.id)
      return {...iv, newEvent: {}, events: R.pipe((events: Event[]) => R.reject(({id}) => id === nv.id, events), R.insert(oldEventIDx, nv))(iv.events)}
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

function updateEventRequest({id, event}: {id: string, event: Event}) {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('eventie_token')
    if (!token) {
      return Bacon.fromPromise(Promise.reject({error: 'Not logged in'}))
    }
    return Bacon.fromPromise(updateEvents(event, id, token))
  }
}

function deleteEventRequest(id: string) {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('eventie_token')
    if (!token) {
      return Bacon.fromPromise(Promise.reject({error: 'Not logged in'}))
    }
    return Bacon.fromPromise(deleteEventDb(id, token))
  }
}
