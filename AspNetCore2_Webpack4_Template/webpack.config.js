const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // entry: './ClientApp/js/index.js',
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, 'wwwroot/webpackTest')
  // },

  entry: {
    index: './ClientApp/js/index.js',
    index2: './ClientApp/js/index2.js',
  },
  output: {
    publicPath: '/',
    // filename: '[name].bundle.js',
    filename: '[name].bundle.[hash].js',
    path: path.resolve(__dirname, 'wwwroot/webpackTest')
  },

  module: {
    rules: [
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
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, 'Views/Shared/_LayoutTemplate.cshtml') ,
      filename: path.resolve(__dirname, 'Views/Shared/_Layout.cshtml'),
      chunks: ["index"]
      // chunks: ['Shared'],
    })
  ]
}
