import React from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import {sendAction} from '../../utils/actionDispatcher'
import { toggleEventModalAction, setRegistrationView } from '../../utils/actions'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

export default class LoginModal extends React.Component<{creds: {username: string, password: string}, newUser: {username: string, name: string, email: string, password: string}, isOpen: boolean, registrationOpen: boolean}> {
  render() {
    const {isOpen, registrationOpen} = this.props
    const {username, password} = this.props.creds
    const {username: newUsername, password: newPassword, name, email} = this.props.newUser
    return (
      <div>
        <Modal isOpen={isOpen}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            {!registrationOpen ? LoginForm({username, password}) : RegistrationForm({username: newUsername, password: newPassword, name, email})}
            <Button onClick={this.closeModal}>Close</Button>
            <Button onClick={() => this.setRegister(registrationOpen)}>{registrationOpen ? 'Back' : 'Register'}</Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }

  setRegister = (isRegistrationOpen: boolean) => {
    sendAction(setRegistrationView, !isRegistrationOpen)
  }

  closeModal = () => {
    const {isOpen} = this.props
    sendAction(toggleEventModalAction, {id: 'login', isOpen: isOpen})
  }
}