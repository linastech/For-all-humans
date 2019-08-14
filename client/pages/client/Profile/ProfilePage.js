import React from 'react'
import {withAuth} from  '@lib/Auth'
import { NextSeo } from 'next-seo'
import { Container } from 'reactstrap'
import Layout from '@layouts/Client'

class ProfilePage extends React.Component {
  render () {
    return (
      <Layout>
        <h1>Profile page</h1>
      </Layout>
    )
  }
}

export default withAuth(ProfilePage)