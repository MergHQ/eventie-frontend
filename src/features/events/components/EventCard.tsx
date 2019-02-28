import React from 'react'
import {Card, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap'
import {Event} from '../../../types/InitialState'
import EventModal from './EventModal';
import {sendAction} from '../../../utils/actionDispatcher'
import {toggleEventModalAction} from '../../../utils/actions'
import { User } from '../../../services/userService'

export default class EventCard extends React.Component<{event: Event, isModalOpen: boolean, user: User}> {
  render() {
    const {id, name, time, maxParticipants, participants} = this.props.event
    return (
      <div id={id}>
        <EventModal event={this.props.event} isOpen={this.props.isModalOpen} user={this.props.user} />
        <Card>
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>
              {new Date(time).toLocaleDateString()}
              <p>{`Registrations: ${participants.length}/${maxParticipants}`}</p>
            </CardSubtitle>
            <Button onClick={this.toggle}>Details</Button>
          </CardBody>
        </Card>
      </div>
    )
  }

  toggle = () => {
    sendAction(toggleEventModalAction, {id: this.props.event.id, isOpen: this.props.isModalOpen})
  }
}