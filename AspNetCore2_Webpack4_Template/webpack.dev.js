const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// 專門給 webpack-hot-middleware 用的
const webpackhotMiddleware = 'webpack-hot-middleware/client?reload=true'

module.exports = merge(common, {
  entry: getNewCommonEntry(common),
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'wwwroot/webpackTest')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // 當程式碼有錯誤時，不更新畫面，如果錯誤被修正才會hot reload
    // 這個可以選擇使用。
    // new webpack.NoErrorsPlugin()
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // contentBase 這個要了解，要再加上
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
    inline: true,
    hot: true,
    // 啟動熱替換
    hotOnly: true
    // open: true
  }
})

//
function getNewCommonEntry(common) {
  const {
    entry
  } = common
  let commonEntry = JSON.parse(JSON.stringify(entry))
  let newCommonEntry = {}
  for (let key in commonEntry) {
    let value = commonEntry[key]
    newCommonEntry[key] = [webpackhotMiddleware, value]
  }

  return newCommonEntry
}
