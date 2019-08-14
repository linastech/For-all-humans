import { newsConstants } from '@redux/constants'
import {CALL_API} from '@redux/middleware/api'

export const newsActions = {  
  getArticles: () => (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [ newsConstants.GET_ARTICLES_REQUEST, newsConstants.GET_ARTICLES_SUCCESS, newsConstants.GET_ARTICLES_FAILURE ],
        endpoint: `news/get-articles`,
        config: {
          method: 'GET',
        }
      }
    })
  },
  getArticle: (slug) => (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [ newsConstants.ARTICLE_REQUEST, newsConstants.ARTICLE_SUCCESS, newsConstants.ARTICLE_FAILURE ],
        endpoint: `news/get-article/${slug}`,
        config: {}
      }
    })
  },
}