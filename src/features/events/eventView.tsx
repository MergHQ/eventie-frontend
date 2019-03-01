import React from 'react'
import Bacon from 'baconjs'
import {Event} from '../../types/InitialState'
import EventCard from './components/EventCard'
import NewEventCard from './components/NewEventCard'
import eventStore from '../../stores/eventStore'

export default function createEventView(events: Event[], modalStoreP: Bacon.Property<any, {id: string, isOpen: boolean}>, userStoreP: Bacon.Property<{}, {}>) {
  const eventStoreP = eventStore(events)

  return Bacon.combineTemplate({
    eventStore: eventStoreP,
    modalStore: modalStoreP,
    userStore: userStoreP
  }).map(({eventStore, modalStore, userStore}) => {
    return (
      <div>
        {listEvents(eventStore.events, modalStore, eventStore, userStore)}
      </div>
    )
  })
}

function listEvents(events: Event[], {id, isOpen, eventEditVisible, eventEditVisibleId}: {id: string, isOpen: boolean, eventEditVisible: boolean, eventEditVisibleId: string}, eventStore: any, userStore: any) {
  return (<div>{events.map(event => (
    <EventCard event={event} isModalOpen={event.id === id ? isOpen : false} user={userStore.loggedUser} updateFormState={{eventEditVisible, eventEditVisibleId, newEvent: eventStore.newEvent}} />
  ))}<NewEventCard isModalOpen={'newEvent' === id ? isOpen : false} formData={eventStore.newEvent} /></div>)
}