import React from 'react'
import Bacon from 'baconjs'
import {Event} from '../../types/InitialState'
import EventCard from './components/EventCard'
import eventModalStore from '../../stores/eventModalStore'
import NewEventCard from './components/NewEventCard'
import eventStore from '../../stores/eventStore'

export default function createEventView(events: Event[]) {
  const eventModalToggleP = eventModalStore()
  const eventStoreP = eventStore(events)

  return Bacon.combineTemplate({
    eventModalToggle: eventModalToggleP,
    eventStore: eventStoreP
  }).map(({eventModalToggle, eventStore}) => {
    return (
      <div>
        {listEvents(eventStore.events, eventModalToggle, eventStore)}
      </div>
    )
  })
}

function listEvents(events: Event[], {id, isOpen}: {id: string, isOpen: boolean}, eventStore: any) {
  return (<div>{events.map(event => (
    <EventCard event={event} isModalOpen={event.id === id ? isOpen : false} />
  ))}<NewEventCard isModalOpen={'newEvent' === id ? isOpen : false} formData={eventStore.newEvent} /></div>)
}