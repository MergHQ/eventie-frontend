import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Event} from '../../../types/InitialState'
import {sendAction} from '../../../utils/actionDispatcher'
import { toggleEventModalAction } from '../../../utils/actions';

export default class EventModal extends React.Component<{event: Event, isOpen: boolean}> {
  render() {
    const {isOpen} = this.props
    const {name, description} = this.props.event

    return (
      <div>
        <Modal isOpen={isOpen}>
          <ModalHeader>{name}</ModalHeader>
          <ModalBody>
            {description}
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