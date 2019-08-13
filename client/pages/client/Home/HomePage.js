import React from 'react'
import {withAuth} from  '@lib/Auth'
import { Container } from 'reactstrap'
import Layout from '@layouts/Client'

class HomePage extends React.Component {
  render () {
    return (
      <Layout>
        <h1>HomePage</h1>
      </Layout>
    )
  }
}

export default HomePage