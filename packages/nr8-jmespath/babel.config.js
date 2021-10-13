module.exports = {
  ignore: [
    'node_modules'
  ],
  presets: [
    ['@babel/env', {
      targets: {
        node: '8'
      }
    }],
    '@babel/typescript'
  ],
  plugins: [
    ['module-resolver', {
      root: ['./'],
      extensions: ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx']
    }]
  ]
}
