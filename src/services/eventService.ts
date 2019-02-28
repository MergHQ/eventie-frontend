import axios, { AxiosError } from 'axios'
import {Event} from '../types/InitialState'
import config from '../../config.js'
import { User } from './userService'

const ENTRYPOINT = process.env.NODE_ENV === 'production' ? config.backEndEntrypoint : 'http://localhost:4200/api'

export function fetchAllUpcomingEvents(): Promise<Event[]> {
  return axios
    .get(ENTRYPOINT + '/events/upcoming')
    .then(({data}) => createEventsFromResponse(data))
}

export function addEvent(formData: Event): Promise<Event | {error: string}> {
  return axios.post(ENTRYPOINT + '/events', formData)
    .then(({data}: {data: Event}) => data)
    .catch((e: AxiosError) => {
      console.log(e)
      return {error: e.response ? e.response.data : 'Error making request'}
    })
}

export function enrollUserToEvent(eventId: string, accessToken: string): Promise<{eventId: string, user: User} | {error: string}> {
  const opts = {
    headers: {
      'Authorization': accessToken
    }
  }
  return axios.put(ENTRYPOINT + '/events/' + eventId, null, opts)
    .then(({data}) => data)
    .catch((e: AxiosError) => {
      console.error(e)
      return {error: e.response ? e.response.data.error : 'Error making request'}
    })
}

function createEventsFromResponse(rawEventData: any[]): Event[] {
  return rawEventData.map(rawEvent => ({
    id: rawEvent.id,
    name: rawEvent.name,
    description: rawEvent.description,
    time: rawEvent.time,
    registrationStart: rawEvent.registration_start,
    registrationEnd: rawEvent.registration_end,
    maxParticipants: rawEvent.max_participants,
    participants: rawEvent.participants
  }))
}