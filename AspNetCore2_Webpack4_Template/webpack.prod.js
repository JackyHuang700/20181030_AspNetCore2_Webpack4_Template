const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const modeStr = 'production'


module.exports = merge(common, {
  // 模式
  mode: modeStr,
  output: {
    filename: '[name].bundle.[hash:8].js'
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(modeStr)
    })
  ]
})

console.log(`bbbbbbbbbbbb: ${process.env.NODE_ENV}`)
