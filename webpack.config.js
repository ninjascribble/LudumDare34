var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './scripts/index',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'scripts/game.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015'
    }]
  },
  plugins: [
    new CleanPlugin(['build']),
    new CopyPlugin([{
      from: './static'
    }, {
      from: './assets',
      to: 'assets'
    }, {
      from: '../node_modules/phaser/dist',
      to: 'scripts'
    }, {
      from: '../node_modules/phaser/docs',
      to: 'phaser/docs'
    }, {
      from: './lib',
      to: 'scripts'
    }])
  ]
};
