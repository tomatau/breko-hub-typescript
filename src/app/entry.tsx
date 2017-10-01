import * as debug from 'debug'

declare global {
  interface Window {
    __INITIAL_STATE__: object
  }
}

debug.enable(process.env.DEBUG)

const log = debug('entry')

log('Environment', process.env)

require('app/start')
