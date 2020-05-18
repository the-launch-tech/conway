const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const WebpackShellPlugin = require('webpack-shell-plugin')
const TerserPlugin = require('terser-webpack-plugin')

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
  mode: 'production',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './build'),
  },
  devtool: 'source-map',
  optimization: {
    mangleWasmImports: true,
    removeAvailableModules: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [new WebpackShellPlugin({ onBuildEnd: ['nodemon ./build/index.js'] })],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.js$|ts|tsx/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: nodeModules,
}
