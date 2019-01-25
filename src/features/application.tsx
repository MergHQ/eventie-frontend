import React from 'react'
import Bacon from 'baconjs'
import {InitialState} from '../types/InitialState'
import {Container} from 'reactstrap'
import MainNaviagation from './components/MainNavigation'
import createEventView from './events/eventView'

export default function createApp(initialState: InitialState) {
  const eventViewP = createEventView(initialState.events)

  return Bacon.combineTemplate({
    eventView: eventViewP
  }).map(({eventView}) => {
    return (
      <Container>
        <MainNaviagation />
        {eventView}
      </Container>
    )
  })
}
