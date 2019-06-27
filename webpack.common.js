const
  pkg                = require('./package.json'),
  path               = require('path'),
  webpack            = require('webpack'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WebpackShellPlugin = require('webpack-shell-plugin'),
  ASSET_PATH         = process.env.ASSET_PATH || '/';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${pkg.name}.js`,
    chunkFilename: '[name].js',
    publicPath: ASSET_PATH
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackShellPlugin({
      onBuildStart: [
        'echo "Building ..."'
      ],
      onBuildEnd: [
        'echo "\nDone!\n"'
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.LIB_VERSION': JSON.stringify(pkg.version)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      title: pkg.name
    }),
  ]
};
