import React from 'react'
import uuidv1 from  'uuid/v1'
import {Link} from "@router"
import NavRoutes from "@router/client/pages"
import { Navbar, Nav, NavItem } from 'reactstrap'

class Menu extends React.Component {
  render() {
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
            <Link href="/login">
              <a className="nav-link">Login</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/register">
              <a className="nav-link">Register</a>
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Menu