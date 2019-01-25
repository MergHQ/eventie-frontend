import React from 'react'
import Bacon from 'baconjs'
import {Event} from '../../types/InitialState'
import EventCard from './components/EventCard'
import eventModalStore from '../../stores/eventModalStore'

export default function createEventView(events: Event[]) {
  const eventModalToggleP = eventModalStore()

  return Bacon.combineTemplate({
    eventModalToggle: eventModalToggleP
  }).map(({eventModalToggle}) => {
    return (
      <div>
        {listEvents(events, eventModalToggle)}
      </div>
    )
  })
}

function listEvents(events: Event[], {id, isOpen}: {id: string, isOpen: boolean}) {
  return events.map(event => (
    <EventCard event={event} isModalOpen={event.id === id ? isOpen : false} />
  ))
}