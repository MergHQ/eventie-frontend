import React from 'react'
import {InitialState} from '../types/InitialState'
import {Container} from 'reactstrap'
import MainNaviagation from './components/MainNavigation'
import createEventView from './events/eventView'

export default function createApp(initialState: InitialState) {
  return (
    <Container>
      <MainNaviagation />
      {createEventView(initialState.events)}
    </Container>
  )
}
