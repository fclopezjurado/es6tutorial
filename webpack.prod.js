const
  webpack = require('webpack'),
  merge   = require('webpack-merge'),
  common  = require('./webpack.common.js'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  TerserJSPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'env': JSON.stringify('production')
    })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
});
