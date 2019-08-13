import fetch from 'cross-fetch'

const callApi = async (args) => {
  try{
    const { 
      config, 
      endpoint, 
    } = args

    const params = {
      method: `GET`,
      ...config
    }

    if(typeof params.body != 'undefined')
      params.body = JSON.stringify(params.body)

    const res = await fetch(`${process.env.API_URL}/${endpoint}`, params)

    if (res.status >= 400) 
      return Promise.reject('Bad response from server')

    const data = await res.json()

    return Promise.resolve(data)
  } catch (err) {
    console.log(err)
    return Promise.reject(`Error fetching ${endpoint}`)
  }
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = callAPI.types
  next(actionWith({ type: requestType }))
  
  return callApi(callAPI).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}