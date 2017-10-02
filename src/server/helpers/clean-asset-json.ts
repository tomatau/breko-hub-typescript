import * as debug from 'debug'
import * as rimraf from 'rimraf'
import { ASSET_FILE } from 'config/paths'
import { isEnv } from 'app/utils/predicates'

const log = debug('clean-assets')

if (isEnv('development')) {
  rimraf(ASSET_FILE, err => {
    if (err) {
      log(err)
      process.exit(1)
    }
  })
}
