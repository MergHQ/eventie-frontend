import request from 'request-promise'
import {InitialState, Event} from '../types/InitialState'
import Bluebird from 'bluebird'

const ENTRYPOINT = process.env.BE_ENTRYPOINT || 'http://localhost:4200/api'

export function resolveInitialState(): Promise<InitialState> {
  const events = fetchEvents()
  return Promise
    .all([events])
    .then(([events]) => ({
      events
    }))
}

function fetchEvents(): Bluebird<Event[]> {
  return request
    .get(ENTRYPOINT + '/events')
    .then(JSON.parse)
    .then(createEventsFromResponse)
}

function createEventsFromResponse(rawEventData: any[]): Event[] {
  return rawEventData.map(rawEvent => ({
    id: rawEvent.id,
    name: rawEvent.name,
    description: rawEvent.description,
    time: rawEvent.time,
    registrationStart: rawEvent.registration_start,
    registrationEnd: rawEvent.registration_end,
    maxParticipants: rawEvent.max_participants 
  }))
}