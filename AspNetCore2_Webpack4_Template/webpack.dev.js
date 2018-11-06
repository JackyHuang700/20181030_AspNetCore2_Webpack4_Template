const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 專門給 webpack-hot-middleware 用的
const webpackhotMiddleware = 'webpack-hot-middleware/client?reload=true'
const { 
  modeDevelopment,
  devServerPort,
  devServerProxyTarget,
 } = require("./webpack.define.js")

module.exports = merge(common, {
  // 模式
  mode: modeDevelopment,
  entry: getNewCommonEntry(common),
  output: {
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 當程式碼有錯誤時，不更新畫面，如果錯誤被修正才會hot reload
    // 這個可以選擇使用。
    // new webpack.NoErrorsPlugin()
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(modeDevelopment)
    }),
    new BundleAnalyzerPlugin()
  ],
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
        target: devServerProxyTarget,
        secure: false
      }
    },
    port: devServerPort,
    inline: true,
    hot: true,
    // 啟動熱替換
    hotOnly: true
    // open: true
  }
})

// 添加HMR伺服器
function getNewCommonEntry(common) {
  const { entry } = common
  const commonEntry = JSON.parse(JSON.stringify(entry))
  let newCommonEntry = {}
  for (let key in commonEntry) {
    let value = commonEntry[key]
    newCommonEntry[key] = [webpackhotMiddleware, value]
  }

  return newCommonEntry
}
