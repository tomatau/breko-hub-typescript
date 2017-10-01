import * as webpack from 'webpack'
import * as CleanPlugin from 'clean-webpack-plugin'
import { CheckerPlugin } from 'awesome-typescript-loader';
import { ROOT, APP, STATIC, SRC, CONFIG, SERVER } from './paths'
import { isomorphicPlugin } from './isomorphic-tools'

export default {
  entry: {
    body: [
      `${APP}/entry.tsx`,
    ],
    // head: [],
  },
  output: {
    path: STATIC,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    modules: [ 'node_modules', SRC ],
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
  },
  plugins: [
    isomorphicPlugin,
    new webpack.NoEmitOnErrorsPlugin(), // ?
    // new webpack.NamedModulesPlugin(), // ?
    new CleanPlugin([ 'src/static' ], {
      root: ROOT,
    }),
    // new CheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DEBUG': JSON.stringify(process.env.DEBUG),
        'APP_ENV': JSON.stringify('browser'),
      },
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'head',
    // }),
    // new ExtractTextPlugin({
    //   filename: '[name].[hash].css',
    //   allChunks: true,
    // }),
  ],
  module: {
    rules: [
      // tsConfig,
    ],
  },
}

export const tsRuleConfig = {
  test: /\.tsx?$/,
  include: [ APP, CONFIG, SERVER ],
  use: [{
  //   loader: 'react-hot-loader/webpack'
  // }, {
    loader: 'awesome-typescript-loader',
    options: {
      target: 'es2015',
      experimentalDecorators: true,
    },
  }],
}