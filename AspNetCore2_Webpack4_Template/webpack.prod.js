const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const modeStr = 'production'
// happypack
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = merge(common, {
  // 模式
  mode: modeStr,
  output: {
    filename: '[name].bundle.[hash:8].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          // loader: 'babel-loader',
          loader: 'happypack/loader?id=babelJs'
          // options: {
          // presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(modeStr)
    }),
    new HappyPack({
      id: 'babelJs',
      loaders: [
        {
          loader: 'babel-loader',
          query: {
            // optional: 'runtime',
            cacheDirectory: true
          },
          options: {
            presets: ['@babel/preset-env']
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: os.cpus().length - 1,
      cache: true
    }),
  ],
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       // sourceMap: true,
  //       // parallel: os.cpus().length  - 1,
  //       // cache: true
  //     })
  //   ]
  // }
})

console.log(`bbbbbbbbbbbb: ${process.env.NODE_ENV}`)
