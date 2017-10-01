process.env.DEBUG = '*,-sockjs*'
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    reasons: false,
  },
}).listen(9001, 'localhost', (err, result) => {
  if (err) {
    return console.error(err)
  }
  console.log('listening on http://localhost:9001');
})
