import * as debug from 'debug'
import * as loadEnv from 'node-env-file'
import { ROOT } from './paths'

loadEnv(`${ROOT}/.env`, { raise: false })

debug.enable(process.env.DEBUG)

const log = debug('environment')

log({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
})

log('Applying defaults')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

if (!process.env.PORT) {
  process.env.PORT = '9001'
}

log({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
})
