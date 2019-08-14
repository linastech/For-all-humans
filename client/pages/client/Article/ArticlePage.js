import React from 'react'
import {Link} from "@router"
import uuidv1 from  'uuid/v1'
import {connect} from 'react-redux'
import { newsActions } from '@redux/actions'
import { Col, Container, Row } from "reactstrap"
import Layout from '@layouts/Client'

class ArticlePage extends React.Component {
  componentDidMount(){
    this.props.dispatch(newsActions.getArticle('32944-Sed-molestiae-officiis-dicta-fuga-itaque-nesciunt.'))
  }
  render () {
    const {posts} = this.props

    return (
      <Layout>
        <h1>Article Page</h1>
      </Layout>
    )
  }
}

export default connect(
  state => ({})
)(ArticlePage)