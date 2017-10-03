import 'config/environment'
import 'server/helpers/clean-asset-json'
import 'server/helpers/css-modules-hook'
import * as debug from 'debug'
import * as http from 'http'
import * as serve from 'koa-static'
import { STATIC, ROOT } from 'config/paths'
import { isomorphicTools, isomorphicPlugin } from 'config/isomorphic-tools'
import { isEnv } from 'app/utils'
import hotReload from 'server/helpers/hot-reload'
import app from 'server-instance'

const log = debug('server-start')

if (isEnv('development')) {
  isomorphicPlugin.development()
  hotReload(app)
} else {
  app.use(serve(STATIC))
}

isomorphicTools.server(ROOT, () => {
  log('webpack ready -> mounting router')

  if (isEnv('development')) {
    app.use(async (...args) => {
      const { rootRouter, setRoutes } = require(`./server/router`)
      setRoutes(isomorphicTools.assets())
      await rootRouter.routes()(...args)
    })
  } else {
    const { rootRouter, setRoutes } = require('./server/router')
    setRoutes(isomorphicTools.assets())
    app.use(rootRouter.routes())
  }
})

const server = http.createServer(app.callback())

server.listen(process.env.PORT, () => {
  const URI = `http://localhost:${process.env.PORT}`
  log('Serving', URI)
})
