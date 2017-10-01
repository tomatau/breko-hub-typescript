import * as IsomorphicTools from 'webpack-isomorphic-tools'
import * as IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import isoConfig from './isomorphic-config'

export const isomorphicTools = new IsomorphicTools(isoConfig)
export const isomorphicPlugin = new IsomorphicToolsPlugin(isoConfig)
