import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { sendAction } from '../../utils/actionDispatcher'
import { updateUserRegistrationFormData, submitNewUserData } from '../../utils/actions'

export default function RegistrationForm(props: {username: string, name: string, email: string, password: string}) {
  const {username, password, name, email} = props
  return (
    <div>
      <Form onSubmit={onUserRegistration}>
        <FormGroup>
          <Label for="name">Username</Label>
          <Input type="text" name="name" id="name" value={username} onChange={e => updateFormData(e, 'username')} placeholder="username" required />
        </FormGroup>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" value={name} onChange={e => updateFormData(e, 'name')} placeholder="name" required />
        </FormGroup>
        <FormGroup>
          <Label for="name">Email</Label>
          <Input type="email" name="name" id="name" value={email} onChange={e => updateFormData(e, 'email')} placeholder="a@b.com" required />
        </FormGroup>
        <FormGroup>
          <Label for="name">Password</Label>
          <Input type="password" name="name" id="name" value={password} onChange={e => updateFormData(e, 'password')} placeholder="password"  required/>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  )
}

function updateFormData(e: React.ChangeEvent<HTMLInputElement>, field: string) {
  sendAction(updateUserRegistrationFormData, {[field]: e.target.value})
}

function onUserRegistration(e: React.ChangeEvent<HTMLFormElement>) {
  e.preventDefault()
  sendAction(submitNewUserData, null)
}