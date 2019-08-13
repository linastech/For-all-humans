import { userConstants } from '@redux/constants'
import {CALL_API} from '@redux/middleware/api'

export const userActions = {
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
};