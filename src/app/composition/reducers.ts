import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducers as bar } from 'app/modules/bar'

export const rootReducer = combineReducers({
  routing: routerReducer,
  bar,
})
