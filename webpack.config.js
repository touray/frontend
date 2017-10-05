const path  = require('path');
const merge = require('webpack-merge');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
  srcJs: path.join(__dirname, 'src/js'),
  distJs: path.join(__dirname, 'dist/js'),
};

const commonConfig = merge([
  // app.bundle.js
  {
    entry: path.resolve(__dirname, 'src/js/app.js'),
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: 'app.bundle.js'
    }
  },
  //parts.babel(),
  parts.eslint(),
]);

const productionConfig = merge([
  {
    plugins: [
      new UglifyJSPlugin({
        compress: true,
        beautify: false,
        exclude: /(?!(foundation-sites)\/).*/
      })
    ]
  },
  parts.generateSourceMaps({ type: 'source-map' })
]);

const developmentConfig = merge([
  {
    watch: true,
    plugins: [
      new UglifyJSPlugin({
        compress: false,
        beautify: true,
        exclude: /(?!(foundation-sites)\/).*/
      })
    ]
  },
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' })
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
