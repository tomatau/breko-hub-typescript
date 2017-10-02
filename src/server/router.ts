import * as debug from 'debug'
import * as Router from 'koa-router'
import * as compose from 'koa-compose'
import makeRenderApp from 'server/middleware/render-app'
import setStore from 'server/middleware/set-store'
import apiRouter from 'server/api'

const log = debug('server-router')
export const rootRouter = new Router()

export function setRoutes(assets) {
  log('clearing route middleware')
  rootRouter.stack.length = 0

  /* build app from routes, set initial state and set response html */
  const renderReactApp = compose([
    /* set a store for server side state rendering */
    setStore,
    /* wire up flashMessages from redirect to server store */
    // flashMessages,
    /* give assets from bundle, set response body from react app */
    makeRenderApp(assets),
  ])

  rootRouter
    .use(apiRouter.routes())
    /* render react app for all other routes */
    .get('react', '/(.*)', renderReactApp)
}
