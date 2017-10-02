import * as webpack from 'webpack'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as CleanPlugin from 'clean-webpack-plugin'
import { CheckerPlugin } from 'awesome-typescript-loader';
import { ROOT, APP, STATIC, SRC, CONFIG, SERVER, STYLES } from './paths'
import { isomorphicPlugin } from './isomorphic-tools'

export default {
  entry: {
    head: [],
    body: [
      `${STYLES}/main.scss`,
      `${APP}/entry.tsx`,
    ],
  },
  output: {
    path: STATIC,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    modules: [ 'node_modules', SRC, STYLES ],
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.scss' ],
  },
  plugins: [
    isomorphicPlugin,
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanPlugin([ 'src/static' ], {
      root: ROOT,
    }),
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DEBUG': JSON.stringify(process.env.DEBUG),
        'APP_ENV': JSON.stringify('browser'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'head',
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        test: isomorphicPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: { limit: 10240 },
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/font-woff' },
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/octet-stream' },
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'image/svg+xml' },
      },
    ],
  },
}

export const tsRuleConfig = {
  test: /\.tsx?$/,
  include: [ APP, CONFIG, SERVER ],
  use: [{
    loader: 'awesome-typescript-loader',
    options: {
      target: 'es2015',
      experimentalDecorators: true,
    },
  }],
}