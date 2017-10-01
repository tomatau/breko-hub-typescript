import { STATUS_CODES } from 'http'
import * as Router from 'koa-router'
import * as koaBody from 'koa-body'
import { Request } from 'koa'

const parseBody = koaBody()
const apiRouter = new Router({ prefix: '/api' })

declare module 'koa' {
  interface Request {
    body: any;
  }
}

apiRouter
  .all('ping', '/ping', parseBody, (ctx) => {
    ctx.response.body = { pong: ctx.request.body }
  })
  .get('bar', '/bar', (ctx) => {
    ctx.response.body = { bar: [ 'bruce', 'willis', 'wet', 'himself' ] }
  })
  .all('not-found', '*', (ctx) => {
    ctx.response.status = 404
    ctx.response.body = { error: STATUS_CODES[status] }
  })

export default apiRouter
