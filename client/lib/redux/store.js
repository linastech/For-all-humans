import { createStore, applyMiddleware } from 'redux'
import { persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import api from '@redux/middleware/api'

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const exampleInitialState = {}

const composeEnhancers = composeWithDevTools({
  trace: true,
})

// A create store function for `withReduxStore` context wrapper
export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    persistedReducer, 
    initialState, 
    composeEnhancers(
      applyMiddleware(thunk, api),
    ),
  )
}