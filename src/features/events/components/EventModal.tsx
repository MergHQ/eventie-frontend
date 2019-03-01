import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap'
import {Event} from '../../../types/InitialState'
import {sendAction} from '../../../utils/actionDispatcher'
import { toggleEventModalAction, enrollToEvent } from '../../../utils/actions'
import { User } from '../../../services/userService'

export default class EventModal extends React.Component<{event: Event, isOpen: boolean, user: User}> {
  render() {
    const {isOpen} = this.props
    const {name, description, participants, maxParticipants, id} = this.props.event
    const {id: userId} = this.props.user
    const {name: author_name} = this.props.event.author

    return (
      <div>
        <Modal isOpen={isOpen}>
          <ModalHeader>{name}</ModalHeader>
          <ModalBody>
            <p>{`By: ${author_name}`}</p>
            {description}
            {registrationButton({maxParticipants, participants, userId, eventId: id})}
            <EnrollmentList maxParticipants={maxParticipants} participants={participants} />
          </ModalBody>
          <ModalFooter>
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