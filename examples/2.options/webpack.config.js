var path = require('path')
var JSEntryWebpackPlugin = require('../../')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: __dirname,
  entry: {
    entry: './example.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new JSEntryWebpackPlugin({
      filename: 'entry.js',
      template: path.join(__dirname, 'build'),
      publicPath: 'https://www.cdn.com',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]@[chunkhash:8].css',
    }),
  ],
}
