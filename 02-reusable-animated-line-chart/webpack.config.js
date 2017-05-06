const path = require('path')
const webpack = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src.js'),
  output: {
    path: __dirname,
    filename: 'src.min.js'
  },
  debug: true,
  devtool: 'sourcemap',
  plugins: [
    new BabiliPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: [
          'transform-es2015-modules-umd',
        ],
      },
    }],
  },
}
