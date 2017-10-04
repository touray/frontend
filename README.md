# Frontend Build [![GitHub version](https://badge.fury.io/gh/bmarshall511%2Ffrontend.svg)](https://badge.fury.io/gh/bmarshall511%2Ffrontend)
[![Code Climate](https://codeclimate.com/github/bmarshall511/frontend.svg)](https://codeclimate.com/github/bmarshall511/frontend)
[![Build Status](https://travis-ci.org/bmarshall511/frontend.svg?branch=master)](https://travis-ci.org/bmarshall511/frontend)
[![dependencies Status](https://david-dm.org/bmarshall511/frontend/status.svg)](https://david-dm.org/bmarshall511/frontend)
[![devDependencies Status](https://david-dm.org/bmarshall511/frontend/dev-status.svg)](https://david-dm.org/bmarshall511/frontend?type=dev)
[![Join the chat at https://gitter.im/frontendbyben/Lobby](https://badges.gitter.im/frontendbyben/Lobby.svg)](https://gitter.im/frontendbyben/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Gratipay User](https://img.shields.io/gratipay/user/bmarshall511.svg)](https://gratipay.com/~bmarshall511/)
[![Beerpay](https://beerpay.io/bmarshall511/frontend/badge.svg?style=flat)](https://beerpay.io/bmarshall511/frontend)

Frontend Build is a light-weight, no-bloat, front-end build framework. It's purpose is to give developers a jumpstart utilizing <a href="https://gulpjs.com/" target="_blank">Gulp</a> to automate repetitive tasks, a <a href="http://getbem.com/" target="_blank">BEM CSS methodology</a> for a standards-driven approach, pre-loaded with the <a href="http://foundation.zurb.com/" target="_blank">Foundation</a> front-end framework (easily add others or even your own!) and integrated with <a href="https://babeljs.io/" target="_blank">Babel</a> allowing developers to use the next generation JavaScript.

**If you're viewing this at https://github.com/bmarshall511/frontend, you're reading the documentation for the master branch.
[View documentation for the latest release.](https://github.com/bmarshall511/frontend/tree/latest#readme)**

## Prerequisites
- [NodeJS](http://nodejs.org/download/)
- [Bundler](http://bundler.io)

## Direct Download

Download the script [here](https://github.com/bmarshall511/frontend/archive/latest.zip) and include it (unless you are packaging scripts somehow else).

## Installation

Navigate to the frontend directory in Terminal and run the following commands:

1. ```$ bundle install``` To install gem dependencies
2. ```$ npm install``` To install dependencies
3. ```$ npm start``` Watch files &amp; run appropriate tasks when needed

## Development Usage

The following commands can be run in the frontend directory during development. An optional `--prod` flag can be appended to run for production environments, defaults to development.

- ```$ gulp``` Runs the default tasks (`delete`, `compass`, `htmlmin`, `js-transpile`, `kss`)
- ```$ gulp js-lint``` Lints JS files
- ```$ gulp js-transpile``` Transpiles JS files
- ```$ gulp scripts``` Lints and compiles JS files
- ```$ gulp compass``` Compiles Sass files
- ```$ gulp delete``` Deletes everything in the dist &amp; styleguide directory
- ```$ gulp copy-fonts``` Copies fonts to the dist directory
- ```$ gulp images``` Minifies images
- ```$ gulp kss``` Generates a styleguide
- ```$ gulp scss-lint``` Lints SCSS files
- ```$ gulp htmlmin``` Minifies HTML documents
- ```$ gulp uncss``` Removes unused styles (needs configuration)
- ```$ gulp style-lint``` Lints the compiled CSS files (needs configuration)

### Styleguides

Another feature to using Frontend Build is it's ability to create a styleguide automatically using [KSS](http://warpspire.com/kss/styleguides/). For more information, see [the syntax documentation](http://warpspire.com/kss/syntax/) on how to utilize this feature.

## Contributing

Check out the [Contributing Guidelines](CONTRIBUTING.md).

## Security

For vulnerability reports, send an e-mail to `me at benmarshall dot me`.

## Authors

* [Ben Marshall](https://github.com/bmarshall511)
* And awesome [contributors](https://github.com/bmarshall511/frontend/graphs/contributors)

## Changelog

