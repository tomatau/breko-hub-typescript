import * as debug from 'debug'
import * as ReactDOMServer from 'react-dom/server'
import * as compose from 'koa-compose'
import { createMemoryHistory } from 'history'
import { routerMiddleware, LOCATION_CHANGE } from 'react-router-redux'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import StaticRouter from 'server/StaticRouter'
import makeHtmlBody from 'server/make-html-body'
import { compact, isOneOf } from 'app/utils'
import createStore, { middleware } from 'app/composition/create-store'
import * as app from 'app/main'

const log = debug('render-app')
const isClientRedirect = isOneOf([ 'PUSH', 'REPLACE' ])

export default function makeRenderApp(assets) {
  return async function renderApp(ctx) {
    const history = createMemoryHistory({
      initialEntries: [ ctx.request.url ]
    })
    const store = createStore(
      [ ...middleware, routerMiddleware(history) ],
      {}
    )
    store.dispatch({ type: LOCATION_CHANGE, payload: history.location })
    const __html = ReactDOMServer.renderToString(
      app.Main(store, history, StaticRouter)
    )

    if (isClientRedirect(history.action)) {
      log('302 redirect to', history.location.pathname)
      ctx.status = 302
      ctx.redirect(history.location.pathname)
    } else {
      log('setting html response body')
      ctx.response.body = makeHtmlBody({
        headScripts: compact([ assets.javascript.head ]),
        headStyles: compact([ assets.styles.body, assets.styles.head ]),
        bodyScripts: compact([ assets.javascript.body ]),
        stringScripts: [
          `window.__INITIAL_STATE__ = ${
            JSON.stringify(store.getState(), null, 2)
          }`,
        ],
        content: [{
          id: CONTAINER_ELEMENT_ID, dangerouslySetInnerHTML: { __html }
        }]
      })
    }
  }
}

