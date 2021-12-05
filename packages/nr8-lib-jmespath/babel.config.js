const config = {
  ignore: [
    'node_modules',
    '*.test.ts',
    '*.d.ts'
  ],
  presets: [
    ['@babel/env', {
      targets: {
        node: '8'
      }
    }],
    '@babel/typescript'
  ]
}

if (process.env.NODE_ENV && process.env.NODE_ENV.match('test')) {
  config.ignore = [
    'node_modules'
  ]
}

module.exports = config
