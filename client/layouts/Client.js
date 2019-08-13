import Head from 'next/head'
import { Container } from 'reactstrap'
import NavBar from '@components/Navbars/Menu/Menu'
import Footer from '@components/Footer/Footer'

class Layout extends React.Component {
  render () {
    const { children } = this.props

    return (
      <Container>
        <Head>
          <title>For All Humans</title>
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Head>
        <NavBar />
        {children}
        <Footer />
      </Container>
    )
  }
}

export default Layout