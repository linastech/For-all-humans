import merge from 'lodash/merge'
import {login} from '@lib/Auth'
import { userConstants } from '@redux/constants'

const initialState = {
  registration:{
    loading: false,
    registered: false,
    error: null
  },
  loggedIn: false,
}

const userActions = (state = initialState, action) =>{
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return merge({}, state, {registration: {loading: true, registered: false, error: null}})
    case userConstants.REGISTER_SUCCESS:
        return merge({}, state, {registration: {loading: false, registered: true, error: null}})
    case userConstants.REGISTER_FAILURE:
        return merge({}, state, {registration: {loading: false, registered: true, error: 'Something went wrong!'}})

    case userConstants.LOGIN_REQUEST:
      return merge({}, state, {loggingIn: true})
    case userConstants.LOGIN_SUCCESS:
      login(action.data.token)
      return merge({}, state, {loggingIn: false, loggedIn: true, ...action.data})
    case userConstants.LOGIN_FAILURE:
      return {};
    
      case userConstants.LOGOUT:
        return merge({}, state, {loggedIn: false})
    default:
      return state
  }
}

export default userActions