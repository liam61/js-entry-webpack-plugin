var path = require('path')
var JSEntryWebpackPlugin = require('../../')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: __dirname,
  entry: './example.js',
  output: {
    path: path.join(__dirname, 'dist'),
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
    new JSEntryWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]@[chunkhash:8].css',
    }),
  ],
}
