import merge from 'lodash/merge'
import { newsConstants } from '@redux/constants'

const initialState = {
  articles: [],
  loading: false,
}

const newsActions = (state = initialState, action) =>{
  switch (action.type) {
    case newsConstants.GET_ARTICLES_REQUEST:
      return merge({}, state, {loading: true})
    case newsConstants.GET_ARTICLES_SUCCESS:
      return merge({}, state, {loading: false, articles: action.data})
    case newsConstants.GET_ARTICLES_FAILURE:
      return merge({}, state, {loading: false})

    default:
      return state
  }
}

export default newsActions