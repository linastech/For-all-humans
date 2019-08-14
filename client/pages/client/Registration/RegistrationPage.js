import React from 'react'
import uuidv1 from  'uuid/v1'
import className from 'classnames'
import { NextSeo } from 'next-seo'
import {connect} from 'react-redux'
import { userActions } from '@redux/actions'
import { Container, Row, Col, Button, Alert, Form, FormGroup, Label, Input, Spinner } from "reactstrap"
import Layout from '@layouts/Client'
import CSS from './RegistrationPage.scss'

class RegistrationPage extends React.Component {
  state = {
    data: {}
  }
  handleChange = (e) =>{
    this.setState({ 
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    })
  }
  handleSubmit = async(e) =>{
    e.preventDefault()

    await this.props.dispatch(userActions.register(this.state.data))

    this.setState({data: {}})
  }

  render() {
    const {loading, registered, error} = this.props

    return (
      <Layout>
        <NextSeo
          title="Sign up"
          description="Sign up page description"
        />
        
        <Container>
          <Row>
            <Col className='mt-md-5' sm={{ size: 6, offset: 3 }}>
              <h4 className="font-weight-normal text-center">Sign Up</h4>
              
              <Form onSubmit={this.handleSubmit} className="mb-md-3 d-flex flex-column">
                <FormGroup>
                  <Label>Username:</Label>
                  <Input
                    onChange={this.handleChange}
                    type="text"
                    name="username"
                    value={this.state.data.username || ''}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email:</Label>
                  <Input
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    value={this.state.data.email || ''}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password:</Label>
                  <Input
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    value={this.state.data.password || ''}
                  />
                </FormGroup>
                <Button color="primary" className="align-self-center" disabled={loading}>
                  {loading && <Spinner className='mr-md-1' size="sm"/> }
                  {loading ? 'Loading...' : 'Get Started'}
                </Button>
              </Form>
              
              {/* Error has occured! */}
              {registered && error != null && <Alert color="danger">{error}</Alert> }
              {/* User has been registered! */}
              {registered && error == null && <Alert color="primary">You have successfully registered!</Alert> }
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    loading: state.userActions.registration.loading,
    registered: state.userActions.registration.registered,
    error: state.userActions.registration.error,
  })
)(RegistrationPage)