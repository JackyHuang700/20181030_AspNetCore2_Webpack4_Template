const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: [path.join(__dirname, 'wwwroot')],
    // contentBase: path.resolve(__dirname, 'wwwroot'),
    // contentBase: './wwwroot',
    proxy: {
      '*': {
      // '/api': {
        // target: 'http://localhost:57288/',
        target: 'https://localhost:44376/',
        secure: false
      }
    },
    hot: true,
    open: true
  }
})
