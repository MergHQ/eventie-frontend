import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Spinner
} from 'reactstrap'
import { sendAction } from '../../utils/actionDispatcher'
import { toggleEventModalAction, fetchUserDetails } from '../../utils/actions'
import { User } from '../../services/userService'

export default class MainNaviagation extends React.Component<{loggedUser: User, isUserLoading: boolean}, {isOpen: boolean}> {
  constructor(props: any) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      sendAction(fetchUserDetails, null)
    }
  }

  render() {
    const {loggedUser, isUserLoading} = this.props

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Eventie</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {isUserLoading ? 
                <Spinner color="dark" /> : 
                <NavLink href="#" onClick={() => sendAction(toggleEventModalAction, {id: loggedUser.username ? 'userDetails' : 'login', isOpen: false})}>{!loggedUser.username ? 'Log in' : `Hello, ${loggedUser.username}`}</NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}