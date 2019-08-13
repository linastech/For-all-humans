import React from 'react'
import Head from 'next/head'
import App, { Container } from 'next/app'
import { PersistGate } from 'redux-persist/lib/integration/react'
import withReduxStore from '@redux/with-redux-store'
import { Provider } from 'react-redux'
import "bootstrap/dist/css/bootstrap.css?raw";
import '@styles/index.scss';


class Root extends App {
  static async getInitialProps ({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    }
  }

  render () {
    const {Component, pageProps, reduxStore, persistor} = this.props
    return (
      <Container>
        <Head>
        </Head>
        <Provider store={reduxStore}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(Root)