import * as debug from 'debug'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import createStore, { middleware } from 'app/composition/create-store'

const log = debug('start')

export const history = createBrowserHistory()
export const store = createStore(
  [ ...middleware, routerMiddleware(history) ],
  window.__INITIAL_STATE__
)

function mount() {
  const { Main } = require('app/main')
  log(`Mounting onto #${CONTAINER_ELEMENT_ID}`)
  ReactDOM.hydrate(
    <AppContainer>
      {Main(store, history, ConnectedRouter)}
    </AppContainer>,
    document.getElementById(CONTAINER_ELEMENT_ID)
  )
}

mount()

if (module.hot) {
  module.hot.accept('app/main', mount)
}
