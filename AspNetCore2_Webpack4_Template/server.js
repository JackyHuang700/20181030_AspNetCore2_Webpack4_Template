const express = require('express')
const proxy = require('http-proxy-middleware')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const config = require('./webpack.dev.js')
const compiler = webpack(config)


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
    // 控制台不显示信息（只有警告和错误）默认：false
    // noInfo: true,
    // stats: { colors: true }
  })
)

app.use(
  webpackHotMiddleware(compiler, {
    // log: console.log
  })
)

app.use(
  '/',
  proxy({
    target: 'https://localhost:44376/',
    secure: false
  })
)

// Serve the files on port 3000.
app.listen(3000, err => {
  if (err) {
    console.error(error)
  } else {
    console.info(
      '==> ?  Listening on port %s. Open up http://localhost:%s/ in your browser.',
      3000,
      3000
    )
  }
  // console.log('Example app listening on port 3000!\n')
})
