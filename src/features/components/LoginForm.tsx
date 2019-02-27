import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { sendAction } from '../../utils/actionDispatcher'
import { updateLoginCreds, login } from '../../utils/actions'

export default function LoginForm(props: {username: string, password: string}) {
  const {username, password} = props
  return (
    <Form onSubmit={onLogin}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" value={username} onChange={e => updateFormData(e, 'username')} placeholder="username" required />
      </FormGroup>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="password" name="name" id="name" value={password} onChange={e => updateFormData(e, 'password')} placeholder="password" required />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

function updateFormData(e: React.ChangeEvent<HTMLInputElement>, field: string) {
  sendAction(updateLoginCreds, {[field]: e.target.value})
}

function onLogin(e: React.ChangeEvent<HTMLFormElement>) {
  e.preventDefault()
  sendAction(login, null)
}