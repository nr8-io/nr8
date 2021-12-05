const config = {
  ...require('./babel.config'),
  extensions: ['.ts', '.tsx'],
  configFile: false
}

process.on('unhandledRejection', error => {
  console.log(error)
  process.exit()
})

require('@babel/register')(config)
