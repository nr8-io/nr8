const config = require('./babel.config')

require('@babel/register')({
  ...config,
  configFile: false,
  extensions: ['.ts', '.tsx']
})
