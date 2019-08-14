import Head from 'next/head'
import { Container } from 'reactstrap'
import NavBar from '@components/Navbars/Menu/Menu'
import Footer from '@components/Footer/Footer'

class Layout extends React.Component {
  render () {
    const { children } = this.props

    return (
      <Container className="d-flex flex-column h-100">
        <Head>
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