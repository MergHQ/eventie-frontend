import axios from 'axios'
import {Event} from '../types/InitialState'

const ENTRYPOINT = process.env.BE_ENTRYPOINT || 'http://localhost:4200/api'

export function fetchAllUpcomingEvents(): Promise<Event[]> {
  return axios
    .get(ENTRYPOINT + '/events')
    .then(({data}) => createEventsFromResponse(data))
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