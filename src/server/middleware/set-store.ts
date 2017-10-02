import * as debug from 'debug'
import { createMemoryHistory } from 'history'
import createStore, { middleware } from 'app/composition/create-store'
import { routerMiddleware, LOCATION_CHANGE } from 'react-router-redux'

const log = debug('set-store')

export default async function (ctx, next) {
  log('Setting server store')
  ctx.history = createMemoryHistory({
    initialEntries: [ ctx.request.url ]
  })
  ctx.store = createStore(
    [ ...middleware, routerMiddleware(ctx.history) ],
    {}
  )
  await next()
}