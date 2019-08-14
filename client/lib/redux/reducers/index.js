import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userActionsReducer from './userActions'
import newsActionsReducer from './news'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['userActions']
}

const userActionsPersistConfig = {
  key: 'userActions',
  storage: storage,
  blacklist: ['registration']
}

const newsActionsPersistConfig = {
  key: 'news',
  storage: storage,
  blacklist: []
}

const rootReducer = persistReducer(rootPersistConfig, combineReducers({
  userActions: persistReducer(userActionsPersistConfig, userActionsReducer),
  news: persistReducer(newsActionsPersistConfig, newsActionsReducer),
}))

export default rootReducer