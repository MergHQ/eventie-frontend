import axios from 'axios'
import {Event} from '../types/InitialState'
import config from '../../config.js';

const ENTRYPOINT = process.env.NODE_ENV === 'production' ? config.backEndEntrypoint : 'http://localhost:4200/api'

export function fetchAllUpcomingEvents(): Promise<Event[]> {
  return axios
    .get(ENTRYPOINT + '/events/upcoming')
    .then(({data}) => createEventsFromResponse(data))
}

export function addEvent(formData: Event): Promise<Event> {
  return axios.post('http://localhost:4200/api/events', formData)
    .then(({data}: {data: Event}) => data)
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