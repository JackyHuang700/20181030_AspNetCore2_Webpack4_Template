const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const {
  commonInclude,
  commonExclude,
  modeProduction,
  devServerPort
} = require('./webpack.define.js')
const common = require('./webpack.common.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// happypack
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// console.log(`bbbbbbbbbbbb: ${process.env.NODE_ENV}`)

module.exports = merge(common, {
  // 模式
  mode: modeProduction,
  output: {
    filename: '[name].bundle.[hash:8].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [commonInclude],
        exclude: [commonExclude],
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
      'process.env.NODE_ENV': JSON.stringify(modeProduction)
    }),
    new HappyPack({
      id: 'babelJs',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          query: {
            // optional: 'runtime',
            cacheDirectory: true
          }
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      ]
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: os.cpus().length - 1,
      cache: true,
      // include: /\/includes/,
      // exclude: /\/excludes/,
      uglifyOptions: {
        ie8: true,
        compress: {
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    })
  ]
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
