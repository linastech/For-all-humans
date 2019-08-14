import { userConstants } from '@redux/constants'
import {CALL_API} from '@redux/middleware/api'

export const userActions = {

  logout: () =>{
    return {
      type: userConstants.LOGOUT
    }
  },
  
  login: (username, password) => (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [ userConstants.LOGIN_REQUEST, userConstants.LOGIN_SUCCESS, userConstants.LOGIN_FAILURE ],
        endpoint: `auth/login`,
        config: {
          method: 'POST',
          body: { username, password }
        }
      }
    })
  },
  
  register: (userData) => (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [ userConstants.REGISTER_REQUEST, userConstants.REGISTER_SUCCESS, userConstants.REGISTER_FAILURE ],
        endpoint: `user/register`,
        config: {
          method: 'POST',
          body: { userData }
        }
      }
    })
  },
}