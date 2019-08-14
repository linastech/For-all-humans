import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import api from '@redux/middleware/api'
import rootReducer from '@redux/reducers'

const composeEnhancers = composeWithDevTools({
  trace: true,
})

export function initializeStore () {
  return createStore(
    rootReducer, 
    {}, //init state 
    composeEnhancers(
      applyMiddleware(thunk, api),
    )
  )
}