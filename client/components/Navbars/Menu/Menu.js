import React from 'react'
import {connect} from 'react-redux'
import uuidv1 from  'uuid/v1'
import {Link} from "@router"
import NavRoutes from "@router/client/pages"
import { Navbar, Nav, NavItem } from 'reactstrap'

class Menu extends React.Component {
  render() {
    const { loggedIn } = this.props

    return (
      <Navbar color="light" light expand="md">
        <Nav navbar>
          {NavRoutes.map(route => (
            <NavItem key={uuidv1()}>
              <Link href={route.pattern}>
                <a className="nav-link">{route.displayName}</a>
              </Link>
            </NavItem>
          ))}
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            {loggedIn ? 
              <Link href="/logout"><a className="nav-link">Logout</a></Link>
            :
              <Link href="/login"><a className="nav-link">Login</a></Link>
            }
          </NavItem>

          {!loggedIn &&
            <NavItem>
              <Link href="/register">
                <a className="nav-link">Register</a>
              </Link>
            </NavItem>
          }
        </Nav>
      </Navbar>
    )
  }
}

export default connect(
  state => ({
    loggedIn: state.userActions.loggedIn,
  })
)(Menu)