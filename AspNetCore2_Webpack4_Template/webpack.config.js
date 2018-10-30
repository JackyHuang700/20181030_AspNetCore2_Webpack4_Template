const path = require('path')

module.exports = {
  entry: './ClientApp/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'wwwroot/webpackTest')
  }
}