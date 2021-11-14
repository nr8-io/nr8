const config = require('./babel.config')

process.on('unhandledRejection', error => {
  console.log(error)
  process.exit()
})

require('@babel/register')({
  ...config,
  configFile: false,
  extensions: ['.ts', '.tsx'],
  ignore: [
    'node_modules'
  ]
})
