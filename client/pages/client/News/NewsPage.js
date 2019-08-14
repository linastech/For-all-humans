import React from 'react'
import {Link} from "@router"
import uuidv1 from  'uuid/v1'
import {connect} from 'react-redux'
import { newsActions } from '@redux/actions'
import { Button, Col, Container, Row } from "reactstrap"
import Layout from '@layouts/Client'

class NewsPage extends React.Component {
  componentDidMount(){
    this.props.dispatch(newsActions.getArticles())
  }
  render () {
    const {articles} = this.props

    return (
      <Layout>
        <h1>News Page</h1>

        <Container>
          <Row>
            {articles.map(post => (
              <Col sm="6" className="mb-5 px-3 overflow-hidden" key={uuidv1()}>
                <img className="w-100" src={post.image} />

                <Link href={`/article/${post.slug}`}>
                  <a className="text-decoration-none">{post.title}</a>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    loading: state.news.loading,
    articles: state.news.articles,
  })
)(NewsPage)