import React from 'react'
import {Card, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap'
import {Event} from '../../../types/InitialState'
import EventModal from './EventModal';
import {sendAction} from '../../../utils/actionDispatcher'
import {toggleEventModalAction} from '../../../utils/actions'

export default class EventCard extends React.Component<{event: Event, isModalOpen: boolean}> {
  render() {
    const {id, name, time} = this.props.event
    return (
      <div id={id}>
        <EventModal event={this.props.event} isOpen={this.props.isModalOpen} />
        <Card>
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>{new Date(time).toLocaleDateString()}</CardSubtitle>
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