const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {
  commonInclude,
  commonExclude,
  // devServer 用這個
  devServerPort,
  // expressDevServer 用這個
  expressDevServerPort
} = require('./webpack.define.js')

// console.log(`aaaaaaaaaaaaaaaaaa: ${process.env.NODE_ENV}`)

module.exports = {
  entry: {
    index: './ClientApp/js/index.js',
    index2: './ClientApp/js/index2.js'
    // index3: './ClientApp/js/index.ts'
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'wwwroot/webpackTest'),
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        // 使用 ts-loader 时，设置 happyPackMode: true / transpileOnly: true
        test: /\.tsx?$/,
        include: [commonInclude],
        exclude: [commonExclude],
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        include: [commonInclude],
        exclude: [commonExclude],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: [commonInclude],
        exclude: [commonExclude],
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [commonInclude],
        exclude: [commonExclude],
        use: ['file-loader']
      },
      {
        test: /\.(csv|tsv)$/,
        include: [commonInclude],
        exclude: [commonExclude],
        use: ['csv-loader']
      },

      {
        test: /\.xml$/,
        include: [commonInclude],
        exclude: [commonExclude],
        use: ['xml-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['wwwroot/webpackTest']),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, 'Views/Shared/_LayoutTemplate.cshtml'),
      filename: path.resolve(__dirname, 'Views/Shared/_Layout.cshtml'),
      chunks: ['index'],
      HtmlWebpackPluginOverride: true,
      outputFile: {
        isProd: false,
        port: devServerPort
      },
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./wwwroot/vendor/vendor.manifest.json')
    })
  ]
  // resolve: {
  //   extensions: [ '.tsx', '.ts', '.js' ]
  // },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       common: {
  //       // vendors: {
  //         filename: '[name].bundle.js'
  // test: /[\\/]node_modules[\\/]/,
  // name: '[name].bundle.js',
  //         chunks: "all"
  //       }
  //     }
  //   }
  // }
}
