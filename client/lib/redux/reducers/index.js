import { combineReducers } from 'redux'
import { userActions } from './userActions'

const rootReducer = combineReducers({
  userActions,
})

export default rootReducer