const config = {
  ignore: [
    'node_modules',
    '*.spec.ts'
  ],
  presets: [
    ['@babel/env', {
      targets: {
        node: '8'
      }
    }],
    '@babel/typescript'
  ],
  extensions: ['.ts', '.tsx']
}

if (process.env.NODE_ENV.match('test')) {
  config.ignore = [
    'node_modules'
  ]
  

module.exports = config