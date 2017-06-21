const webpack = require('webpack');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  debug: true,
  devtool: PROD ? 'source-map' : 'eval-source-map',
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel']}
    ]
  },
  output: {
    filename: 'app.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      comments: false
    })
  ] : [
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
