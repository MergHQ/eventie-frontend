import React from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import {sendAction} from '../../utils/actionDispatcher'
import { toggleEventModalAction } from '../../utils/actions'
import { User } from '../../services/userService'
import ModalFooter from 'reactstrap/lib/ModalFooter';

export default class UserDetailModal extends React.Component<{user: User, isOpen: boolean}> {
  render() {
    const {isOpen} = this.props
    const {username, name, email} = this.props.user

    return (
      <div>
        <Modal isOpen={isOpen}>
          <ModalHeader>User details</ModalHeader>
          <ModalBody>
            <h3>Username:</h3>
            <p>{username}</p>
            <h3>Name:</h3>
            <p>{name}</p>
            <h3>Email:</h3>
            <p>{email}</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.closeModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  closeModal = () => {
    const {isOpen} = this.props
    sendAction(toggleEventModalAction, {id: 'userDetails', isOpen: isOpen})
  }
}