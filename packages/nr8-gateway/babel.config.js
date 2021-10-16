module.exports = {
  ignore: [
    '**/node_modules',
    '**/*.spec.ts'
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
