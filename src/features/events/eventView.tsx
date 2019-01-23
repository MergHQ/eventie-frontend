import React from 'react'
import {Event} from '../../types/InitialState'
import EventCard from './components/EventCard'

export default function createEventView(events: Event[]) {
  return (
    <div>
      {listEvents(events)}
    </div>
  )
}

function listEvents(events: Event[]) {
  return events.map(event => (
    <EventCard event={event} />
  ))
}