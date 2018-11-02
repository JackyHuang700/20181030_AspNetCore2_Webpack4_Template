const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  // 模式
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin(),
  ]
})
