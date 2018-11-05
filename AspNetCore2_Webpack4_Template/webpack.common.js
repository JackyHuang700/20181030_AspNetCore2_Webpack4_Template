const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

console.log(`aaaaaaaaaaaaaaaaaa: ${process.env.NODE_ENV}`)

module.exports = {
  entry: {
    index: './ClientApp/js/index.js',
    index2: './ClientApp/js/index2.js',
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
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.(csv|tsv)$/,
        exclude: /node_modules/,
        use: ['csv-loader']
      },

      {
        test: /\.xml$/,
        exclude: /node_modules/,
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
      isProd: false
    }),
  ],
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
