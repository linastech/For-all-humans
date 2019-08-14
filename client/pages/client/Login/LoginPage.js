import React, { Component } from 'react'
import className from 'classnames'
import {connect} from 'react-redux'
import { userActions } from '@redux/actions'
import { Button, Card, CardBody, Alert, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import CSS from './LoginPage.scss'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false
  }

  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    
    const res = await this.props.dispatch(userActions.login(this.state.username, this.state.password))

    let message = ''
    
    if(res.status == 401) message = 'Wrong username or password!'

    if(res.status > 200 && res.status != 401) message = res.error 

    this.setState({
      message: message,
      error: res.status > 200
    })
  }

  render() {
    const {message, error} = this.state

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
                        <Input 
                          type="text" 
                          name="username"
                          placeholder="Email" 
                          autoComplete="email" 
                          onChange={this.handleChange}
                          value={this.state.username || ''}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="password"
                          name="password" 
                          placeholder="Password" 
                          autoComplete="current-password" 
                          onChange={this.handleChange}
                          value={this.state.password || ''}
                        />
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
              {message != null && <Alert color={error ? 'danger' : 'primary'}>{message}</Alert> }
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