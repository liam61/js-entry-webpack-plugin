var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')
var webpack = require('webpack')

var examples = fs.readdirSync(__dirname).filter(function (file) {
  return fs.statSync(path.join(__dirname, file)).isDirectory()
})

examples.forEach(function (exampleName) {
  var examplePath = path.join(__dirname, exampleName)
  var configFile = path.join(examplePath, 'webpack.config.js')

  var config = require(configFile)
  config.plugins.unshift(
    new webpack.LoaderOptionsPlugin({
      options: {
        context: process.cwd(), // or the same value as `context`
      },
    }),
  )
  config.mode = 'production'
  config.optimization = config.optimization || {}
  config.optimization.minimizer = []

  rimraf.sync(path.join(examplePath, 'dist'))
  rimraf.sync(path.join(examplePath, 'build'))
  webpack(config, function (err, stats) {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }
  })
})
