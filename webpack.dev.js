const webpack = require('webpack'),
  merge = require('webpack-merge'),
  common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'env': JSON.stringify('development')
    })
  ]
});
