const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')
const path = require('path')
const fs = require('fs')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: './src/index',
  mode: 'development',
  target: 'node',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './build'),
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.js$|ts|tsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: nodeModules,
  plugins: [new WebpackShellPlugin({ onBuildEnd: ['nodemon ./build/index.js --watch build'] })],
}
