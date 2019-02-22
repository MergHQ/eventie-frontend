import React from 'react'
import Bacon from 'baconjs'
import {InitialState} from '../types/InitialState'
import {Container} from 'reactstrap'
import MainNaviagation from './components/MainNavigation'
import createEventView from './events/eventView'
import modalStore from '../stores/modalStore'
import LoginModal from './components/LoginModal'
import authStore from '../stores/authStore'
import userStore from '../stores/userStore'
import UserDetailModal from './components/UserDetailsModal';

export default function createApp(initialState: InitialState) {
  const modalStoreP = modalStore()
  const eventViewP = createEventView(initialState.events, modalStoreP)
  const authStoreP = authStore()
  const userStoreP = userStore()

  return Bacon.combineTemplate({
    eventView: eventViewP,
    modalStore: modalStoreP,
    authStore: authStoreP,
    userStore: userStoreP
  }).map(({eventView, modalStore, authStore, userStore}) => {
    const loginIsOpen = modalStore.id === 'login' && modalStore.isOpen
    const isUserDetailsOpen = modalStore.id === 'userDetails' && modalStore.isOpen
    return (
      <Container>
        <LoginModal isOpen={loginIsOpen} creds={authStore} newUser={userStore.newUser} registrationOpen={modalStore.registrationOpen} />
        <UserDetailModal user={userStore.loggedUser} isOpen={isUserDetailsOpen} />
        <MainNaviagation loggedUser={userStore.loggedUser} isUserLoading={userStore.isLoading} />
        {eventView}
      </Container>
    )
  })
}
