import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Event } from '../../../types/InitialState';

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
            <Button color="primary">Do Something</Button>{' '}
            <Button color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}