import React from 'react'
import {Card, CardBody,
  CardTitle, CardSubtitle, Button} from 'reactstrap'
import {Event} from '../../../types/InitialState'
import EventModal from './EventModal';

export default class EventCard extends React.Component<{event: Event}, {isOpen: boolean}> {
  constructor(props: any) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  render() {
    const {id, name, time} = this.props.event
    return (
      <div id={id}>
        <EventModal event={this.props.event} isOpen={this.state.isOpen} />
        <Card>
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>{new Date(time).toLocaleDateString()}</CardSubtitle>
            <Button onClick={this.toggle}>Button</Button>
          </CardBody>
        </Card>
      </div>
    )
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}