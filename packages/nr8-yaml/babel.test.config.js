const config = require('./babel.config')

require('@babel/register')({
  ...config,
  configFile: false,
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  ignore: [
    '**/node_modules'
  ]
})
