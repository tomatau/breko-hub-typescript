import * as webpack from 'webpack'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig, { tsRuleConfig } from './webpack.base.config'
import { SRC } from './paths'

export default {
  ...webpackConfig,
  entry: {
    ...webpackConfig.entry,
    body: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      ...webpackConfig.entry.body,
    ],
    // head: [
    //   ...webpackConfig.entry.head,
    // ],
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    ...webpackConfig.plugins,
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [ ...webpackConfig.module.rules, {
    //   test: /module\.s?css$/,
    //   include: [ SRC ],
    //   // not extracting css-modules in development for hot-reloading
    //   use: [
    //     { loader: 'style-loader' },
    //     { loader: 'css-loader',
    //       options: { modules: true, localIdentName: '[path][name]-[local]' } },
    //     { loader: 'postcss-loader' },
    //     { loader: 'sass-loader',
    //       options: { outputStyle: 'expanded' } },
    //   ],
    // }, {
    //   test: /\.s?css$/,
    //   include: [ SRC ],
    //   exclude: /module\.s?css$/,
    //   loader: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: [
    //       'css-loader',
    //       'postcss-loader',
    //       { loader: 'sass-loader', options: { outputStyle: 'expanded' } },
    //     ],
    //   }),
    // }, {
      ...tsRuleConfig,
      use: [
        {
          loader: 'react-hot-loader/webpack'
        },
        ...tsRuleConfig.use
      ]
    } ],
  },
}