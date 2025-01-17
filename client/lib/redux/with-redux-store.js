import App, {Container} from 'next/app'
import {Provider} from 'react-redux'
import {initializeStore} from '@redux/store'
import { persistStore } from 'redux-persist'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

export const getOrCreateStore = (initialState) =>{
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export const WithRedux = (App) => {
  return class Redux extends React.Component {
    static async getInitialProps (appContext) {
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
      this.persistor = persistStore(this.reduxStore);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} persistor={this.persistor} />
    }
  }
}