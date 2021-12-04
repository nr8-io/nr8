const config = {
  ...require('./babel.config'),
  configFile: false,
  extensions: ['.ts', '.tsx']
}
process.exit()
if (process.env.NODE_ENV.match('test')) {
  config.ignore = [
    'node_modules'
  ]
}

process.on('unhandledRejection', error => {
  console.log(error)
  process.exit()
})

require('@babel/register')(config)