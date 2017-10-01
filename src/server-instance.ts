import * as Koa from 'koa'
import * as compress from 'koa-compress'
import * as convert from 'koa-convert'
// import * as session from 'koa-session-store'
// import * as favicon from 'koa-favicon'
import * as logger from 'koa-logger'
import * as debug from 'debug'
import * as compressible from 'compressible'
import handleError from 'server/handle-error'

// const log = debug('server-instance')

const app = new Koa()

app.keys = [ 'd0n7', '7311', '4ny0n3' ]
app.use(compress({
  filter: type => !(/event-stream/i.test(type)) && compressible(type),
}))
// app.use(favicon(`${ASSETS}/favicon.ico`))
// app.use(convert(session()))
// app.use(sessionFlashArray())

if (debug.enabled('server')) {
  app.use(logger())
}

app.use(handleError)

export default app