const webpack = require('webpack');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  debug: true,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devtool: PROD ? 'source-map' : 'eval-source-map',
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  output: {
    filename: 'app.js'
  },
  plugins: PROD ? [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      comments: false
    })
  ] : [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        drop_console: false
      },
      beautify: true,
      comments: true
    })
  ],
  target: 'web'
};
