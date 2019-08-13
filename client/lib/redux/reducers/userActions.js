import merge from 'lodash/merge'
import {login} from '@lib/Auth'
import { userConstants } from '@redux/constants'

const initialState = {
}

export function userActions(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return merge({}, state, {loggingIn: true})
    case userConstants.LOGIN_SUCCESS:
      login(action.response.token)
      return merge({}, state, {loggingIn: false, ...action.response})
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}