import React from 'react'
import {Card, CardBody, CardTitle, Button} from 'reactstrap'
import {sendAction} from '../../../utils/actionDispatcher'
import {toggleEventModalAction} from '../../../utils/actions'
import NewEventForm from './NewEventFormModal';
import { Event } from '../../../types/InitialState'

export default class NewEventCard extends React.Component<{formData: Event, isModalOpen: boolean}> {
  render() {
    const {isModalOpen, formData} = this.props
    return (
      <div>
        <NewEventForm event={formData} isOpen={isModalOpen} />
        <Card>
          <CardBody>
            <CardTitle>+</CardTitle>
            <Button onClick={this.toggle}>New Event</Button>
          </CardBody>
        </Card>
      </div>
    )
  }

  toggle = () => {
    sendAction(toggleEventModalAction, {id: 'newEvent', isOpen: this.props.isModalOpen})
  }
}