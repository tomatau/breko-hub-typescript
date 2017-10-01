import * as debug from 'debug'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'
import { rootReducer } from 'app/composition/reducers'

const log = debug('create-store')

export const middleware = [
  // thunkMiddleware,
  promiseMiddleware(),
  // sagaMiddleware,
]

export default (mware=middleware, initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...mware),
    ),
  )
  
  if (module.hot) {
    module.hot.accept('app/composition/reducers', () => {
      const { rootReducer } = require('app/composition/reducers')
      log(`Replacing store's root reducer`)
      store.replaceReducer(rootReducer)
    })
  }

  return store
}