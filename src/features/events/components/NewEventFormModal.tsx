import React from 'react'
import {Form, Input, Label, FormGroup, Button, ModalHeader, ModalBody, Modal} from 'reactstrap'
import { Event } from '../../../types/InitialState'
import { sendAction } from '../../../utils/actionDispatcher'
import { updateNewEventFormData, toggleEventModalAction, submitFormDataAction } from '../../../utils/actions'

export default class NewEventFormModal extends React.Component<{event: Event, isOpen: boolean}> {
  render() {
    const {isOpen, event} = this.props
    const {name, description, registrationStart, registrationEnd, time, maxParticipants} = event
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>New event</ModalHeader>
        <ModalBody>
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
              <Input type="date" name="registration_start" value={registrationStart ? registrationStart.toISOString().split('T')[0] : null} onChange={e => this.updateFormData(e, 'registration_start')} id="regstart" />
            </FormGroup>
            <FormGroup>
              <Label for="regend">End of registration</Label>
              <Input type="date" name="registration_end" value={registrationEnd ? registrationEnd.toISOString().split('T')[0]  : null} onChange={e => this.updateFormData(e, 'registration_end')} id="regend" />
            </FormGroup>
            <FormGroup>
              <Label for="time">Time of event</Label> 
              <Input type="date" name="time" value={time ? time.toISOString().split('T')[0]  : null} onChange={e => this.updateFormData(e, 'time')} id="time" />
            </FormGroup>
            <FormGroup>
              <Label for="number">Max number of participants</Label>
              <Input type="number" name="max_participants" value={maxParticipants} onChange={e => this.updateFormData(e, 'max_participants')} id="number" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
          <Button onClick={this.closeModal}>Close</Button>
        </ModalBody>
      </Modal>
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
    sendAction(submitFormDataAction, null)
  }

  closeModal = () => {
    sendAction(toggleEventModalAction, {id: 'newEvent', isOpen: this.props.isOpen})
  }
}