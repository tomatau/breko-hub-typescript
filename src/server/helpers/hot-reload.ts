import * as debug from 'debug'
import * as chokidar from 'chokidar'
import * as webpack from 'webpack'
import * as koaWebpack from 'koa-webpack'
import * as _ from 'lodash'
import * as R from 'ramda'
import webpackDevelopmentConfig from 'config/webpack.development.config'
import { isomorphicTools } from 'config/isomorphic-tools'
import { SERVER } from 'config/paths'

const log = debug('hot-reload')

const serverDirs = [
  /\/server\//,
  /\/config\//,
  /\/styles\//,
  /\/assets\//,
]
const allDirs = [
  /\/app\//,
  ...serverDirs,
]

const hasMatch = (regexs, id) =>
  R.any(idMatchesRegExp(id))(regexs)

export default function hotReload(app) {
  const compiler = webpack(webpackDevelopmentConfig)
  const watcher = chokidar.watch(SERVER)

  compiler.plugin('compile', () => log('Webpack - compile started...'))
  compiler.plugin('compilation', () => log('Webpack - compiling...'))

  app.use(koaWebpack({
    compiler,
    dev: {
      quiet: true,
      noInfo: true,
      stats: {
        colors: false,
        reasons: false,
      },
    },
    hot: { log: debug('webpack') },
  }))

  watcher.on('ready', () => {
    watcher.on('all', _.after(2, (event, file) => {
      log('Watcher - live update in server', event, file)
      clearServerCache(serverDirs, (id) => {
        log('[SERVER] deleting cache for', id)
      })
    }))
  })

  compiler.plugin('done', _.after(2, () => {
    log('Webpack - recompiled!')
    clearServerCache(allDirs, (id) => {
      log('[ALL] deleting cache for', id)
    })
    isomorphicTools.refresh()
  }))
}

function clearServerCache(directories: RegExp[], callback: Function) {
  Object.keys(require.cache).forEach((id) => {
    if (hasMatch(directories, id)) {
      callback(id)
      delete require.cache[id]
    }
  })
}

function idMatchesRegExp(id: any): (a: RegExp) => boolean {
  return (regex: RegExp) => regex.test(id)
}

