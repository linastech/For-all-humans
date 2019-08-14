import fetch from 'cross-fetch'

const callApi = async (args) => {
  try{
    const { 
      config, 
      endpoint, 
    } = args

    const params = {
      method: `GET`,
      headers: {
        "Content-Type": "application/json"
      },
      ...config
    }

    if(typeof params.body != 'undefined')
      params.body = JSON.stringify(params.body)

    const res = await fetch(`${process.env.API_URL}/${endpoint}`, params)

    if (res.status >= 400) 
      return Promise.reject({error: res.statusText, status: res.status})

    const contentType = res.headers.get("content-type")
    let data = null
    
    if (contentType && contentType.indexOf("application/json") !== -1)
      data = await res.json()

    return Promise.resolve({data, status: res.status})
  } catch (err) {
    console.log(err)
    return Promise.reject({error: err.message, status: 500})
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
      data: response.data,
      status: response.status,
      type: successType
    })),
    response => next(actionWith({
      type: failureType,
      status: response.status,
      error: response.error
    }))
  )
}