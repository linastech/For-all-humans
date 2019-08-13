import React, { Component } from 'react'
import className from 'classnames'
import {connect} from 'react-redux'
import { userActions } from '@redux/actions'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import CSS from './LoginPage.scss'

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const {dispatch} = this.props

    dispatch(userActions.login('admin', 'admin'))
  }

  render() {
    return (
      <div className={CSS.pageWrapper}>
        <Container className="container h-100">
          <Row className="row align-items-center h-100">
            <Col md="4" className='col-6 mx-auto'>
              <CardGroup>
                <Card className={className('p-4', CSS['card-login'])}>
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h4 className="card-title text-center">Welcome</h4>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col className="text-center">
                          <Button color="primary" type="submit" className="px-4">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default connect(
  state => ({})
)(Login)