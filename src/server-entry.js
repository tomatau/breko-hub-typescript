const tsConfig = require('../tsconfig.json')

require('ts-node/register')
require('tsconfig-paths').register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,
})
require('./server-start')
