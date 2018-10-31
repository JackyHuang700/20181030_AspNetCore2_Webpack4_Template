const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'wwwroot/webpackTest')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: [path.join(__dirname, 'wwwroot')],
    // contentBase: path.resolve(__dirname, 'wwwroot'),
    // contentBase: '/wwwroot/',
    // contentBase: '/wwwroot/webpackTest/',
    // publicPath: '/wwwroot/',
    // publicPath: '/wwwroot/webpackTest/',
    publicPath: '/',
    proxy: {
      '*': {
        // target: 'http://localhost:57288/',
        target: 'https://localhost:44376/',
        secure: false
      }
    },
    hot: true,
    // open: true
  }
})
