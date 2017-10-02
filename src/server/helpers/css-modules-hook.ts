import * as debug from 'debug';
import * as cssModulesHook from 'css-modules-require-hook'
import * as sass from 'node-sass'
import * as loaderUtils from 'loader-utils'
import * as autoprefixer from 'autoprefixer'
import { ROOT, STYLES } from 'config/paths'

const log = debug('css-hook')

log('Building CSS-modules for all .scss and .css files')

cssModulesHook({
  extensions: [ '.scss', '.css' ],
  prepend: [ autoprefixer({ browsers: [ 'last 2 versions' ] }) ],
  generateScopedName(exportedName, exportedPath) {
    const path = exportedPath
      .replace(`${ROOT}/`, '')
      .replace(/^\//, '')
      .replace(/\.s?css$/, '')
      .replace(/\/|\.|@/g, '-')
    return `${path}-${exportedName}`
  },
  preprocessCss(css, filename) {
    return sass.renderSync({
      includePaths: [ `${ROOT}/node_modules`, STYLES ],
      data: css,
      file: filename,
      importer(url) {
        return { file: loaderUtils.urlToRequest(url) }
      },
    }).css
  },
})
