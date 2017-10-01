import * as React from 'react'
import { Provider } from 'react-redux'
import App from 'app/components/App'

/*
  Main function for:
  - integration testing
  - client render in webpack
  - server side render in node
  - hot reloading in both
*/
export const Main = (store, history, Router) => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)
