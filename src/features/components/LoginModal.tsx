import React from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {sendAction} from '../../utils/actionDispatcher'
import { toggleEventModalAction, updateLoginCreds, login } from '../../utils/actions';

export default class LoginModal extends React.Component<{creds: {username: string, password: string}, isOpen: boolean}> {
  render() {
    const {isOpen} = this.props
    const {username, password} = this.props.creds

    return (
      <div>
        <Modal isOpen={isOpen}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.login}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" value={username} onChange={e => this.updateFormData(e, 'username')} placeholder="username" />
              </FormGroup>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="password" name="name" id="name" value={password} onChange={e => this.updateFormData(e, 'password')} placeholder="password" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
            <Button onClick={this.closeModal}>Close</Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }

  login = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendAction(login, null)
  }

  updateFormData = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    sendAction(updateLoginCreds, {[field]: e.target.value})
  }

  closeModal = () => {
    const {isOpen} = this.props
    sendAction(toggleEventModalAction, {id: 'login', isOpen: isOpen})
  }
}