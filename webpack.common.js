const
  pkg = require('./package.json'),
  path = require('path'),
  webpack = require('webpack'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WebpackShellPlugin = require('webpack-shell-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  env = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${pkg.name}.js`,
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
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
      'version': JSON.stringify(pkg.version)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      title: pkg.name
    }),
    new MiniCssExtractPlugin({
      filename: env ? `${pkg.name}.css` : `${pkg.name}.[hash].css`,
      chunkFilename: env ? `${pkg.name}.css` : `${pkg.name}.[hash].css`,
    }),
  ]
};
