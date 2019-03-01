import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap'
import {Event} from '../../../types/InitialState'
import {sendAction} from '../../../utils/actionDispatcher'
import { toggleEventModalAction, enrollToEvent, setEditEventView, setNewEvent, deleteEvent } from '../../../utils/actions'
import { User } from '../../../services/userService'
import EditEventView from './EditEventView';

export default class EventModal extends React.Component<{event: Event, isOpen: boolean, user: User, updateFormState: {eventEditVisible: boolean, eventEditVisibleId: string, newEvent: Event}}> {
  render() {
    const {isOpen} = this.props
    const {name, description, participants, maxParticipants, id} = this.props.event
    const {id: userId} = this.props.user
    const {name: authorName, id: authorId} = this.props.event.author
    const {eventEditVisible, eventEditVisibleId, newEvent} = this.props.updateFormState
    if (eventEditVisible && eventEditVisibleId === id) {
      return (
        <Modal isOpen={isOpen}>
          <ModalHeader>{`Editing: ${name}`}</ModalHeader>
          <ModalBody>
            <EditEventView event={newEvent} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.closeModal} color="danger">Close</Button>
          </ModalFooter>
        </Modal>
      )
    }

    return (
      <div>
        <Modal isOpen={isOpen}>
          <ModalHeader>{name}</ModalHeader>
          <ModalBody>
            <p>{`By: ${authorName}`}</p>
            {description}
            {registrationButton({maxParticipants, participants, userId, eventId: id})}
            <EnrollmentList maxParticipants={maxParticipants} participants={participants} />
          </ModalBody>
          <ModalFooter>
            {userId === authorId && <Button onClick={this.setEditMode}>Edit event</Button>}
            {userId === authorId && <Button onClick={this.deleteEvent}>Delete event</Button>}
            <Button onClick={this.closeModal} color="danger">Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  closeModal = () => {
    const {event, isOpen} = this.props
    sendAction(toggleEventModalAction, {id: event.id, isOpen: isOpen})
  }

  setEditMode = () => {
    const {event} = this.props
    sendAction(setNewEvent, event)
    sendAction(setEditEventView, event.id)
  }

  deleteEvent = () => {
    sendAction(deleteEvent, this.props.event.id)
  }
}

function registrationButton({maxParticipants, participants, userId, eventId}: {maxParticipants: number, participants: Array<{id: string, username: string}>, userId: string, eventId: string}) {
  if (participants.length < maxParticipants && !participants.find(({id}) => id === userId)) {
    return (
      <Button onClick={() => enroll(eventId)}>Enroll to this event</Button>
    )
  }
}

function enroll(eventId: string) {
  sendAction(enrollToEvent, eventId)
}

function EnrollmentList({maxParticipants, participants}: {maxParticipants: number, participants: Array<{id: string, username: string}>}) {
  const [isVisible, setVisible] = useState(false)
  return (
    <React.Fragment>
      <Button onClick={() => setVisible(!isVisible)}>Show participants</Button>
      {isVisible && 
        <ListGroup>
          {participants.map(({username}) => <ListGroupItem>{username}</ListGroupItem>)}
        </ListGroup>
      }
    </React.Fragment>
  )
}