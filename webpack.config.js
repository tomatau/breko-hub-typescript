const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: [
    `webpack-dev-server/client?http://0.0.0.0:9001`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/app/entry',
  ],
  output: {
    path: '/dist',
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  resolve: {
    modules: [
      process.cwd(),
      'node_modules',
    ],
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
  },
  devtool: 'source-map',
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CheckerPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DEBUG': JSON.stringify(process.env.DEBUG),
        'APP_ENV': JSON.stringify('browser'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'react-hot-loader/webpack'
        }, {
          loader: 'awesome-typescript-loader'
        }],
      }
    ],
  },
}
