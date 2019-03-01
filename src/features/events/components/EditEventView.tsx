import React from 'react'
import {Form, Input, Label, FormGroup, Button} from 'reactstrap'
import { Event } from '../../../types/InitialState'
import { sendAction } from '../../../utils/actionDispatcher'
import { updateNewEventFormData, setEditEventView, submitUpdatedEventData } from '../../../utils/actions'

export default class EditEventView extends React.Component<{event: Event}> {
  render() {
    const {event} = this.props
    const {name, description, registrationStart, registrationEnd, time, maxParticipants} = event
    return (
      <React.Fragment>
        <Form onSubmit={this.submitData}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={name} onChange={e => this.updateFormData(e, 'name')} placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="desc">Description</Label>
            <Input type="textarea" name="description" value={description} onChange={e => this.updateFormData(e, 'description')} id="desc" />
          </FormGroup>
          <FormGroup>
            <Label for="regstart">Start of registration</Label>
            <Input type="date" name="registration_start" value={registrationStart ? new Date(registrationStart).toISOString().split('T')[0] : null} onChange={e => this.updateFormData(e, 'registration_start')} id="regstart" />
          </FormGroup>
          <FormGroup>
            <Label for="regend">End of registration</Label>
            <Input type="date" name="registration_end" value={registrationEnd ? new Date(registrationEnd).toISOString().split('T')[0]  : null} onChange={e => this.updateFormData(e, 'registration_end')} id="regend" />
          </FormGroup>
          <FormGroup>
            <Label for="time">Time of event</Label> 
            <Input type="date" name="time" value={time ? new Date(time).toISOString().split('T')[0]  : null} onChange={e => this.updateFormData(e, 'time')} id="time" />
          </FormGroup>
          <FormGroup>
            <Label for="number">Max number of participants</Label>
            <Input type="number" name="max_participants" value={maxParticipants} onChange={e => this.updateFormData(e, 'max_participants')} id="number" />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        <Button onClick={this.goBack}>Back to event</Button>
      </React.Fragment>
    )
  }

  updateFormData = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.getAttribute('type') === 'date') {
      return sendAction(updateNewEventFormData, {[field]: new Date(e.target.value)})
    }
    sendAction(updateNewEventFormData, {[field]: e.target.value})
  }

  submitData = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendAction(submitUpdatedEventData, this.props.event.id)
  }

  goBack = () => {
    sendAction(setEditEventView, this.props.event.id)
  }
}