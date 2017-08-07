# Frontend <sup style="font-size: 0.6875rem; vertical-align: super;">build</sup> [![GitHub version](https://badge.fury.io/gh/bmarshall511%2Ffrontend.svg)](https://badge.fury.io/gh/bmarshall511%2Ffrontend)
[![Code Climate](https://codeclimate.com/github/bmarshall511/frontend.svg)](https://codeclimate.com/github/bmarshall511/frontend)
[![Build Status](https://travis-ci.org/bmarshall511/frontend.svg?branch=master)](https://travis-ci.org/bmarshall511/frontend)
[![dependencies Status](https://david-dm.org/bmarshall511/frontend/status.svg)](https://david-dm.org/bmarshall511/frontend)
[![devDependencies Status](https://david-dm.org/bmarshall511/frontend/dev-status.svg)](https://david-dm.org/bmarshall511/frontend?type=dev)
[![Join the chat at https://gitter.im/frontendbyben/Lobby](https://badges.gitter.im/frontendbyben/Lobby.svg)](https://gitter.im/frontendbyben/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Gratipay User](https://img.shields.io/gratipay/user/bmarshall511.svg)](https://gratipay.com/~bmarshall511/)
[![Beerpay](https://beerpay.io/bmarshall511/frontend/badge.svg?style=flat)](https://beerpay.io/bmarshall511/frontend)

> Frontend Build is a light-weight, no-bloat front-end build framework. It's purpose is to give developers a jumpstart utilizing Node to automate repetitive tasks, a variables file to quickly configure base elements and a standards-driven approach to help prevent spaghetti code making new developer ramp-up time much shorter.

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

**IMPORTANT: DO NOT EDIT ANYTHING IN THE `src/scss/frontend` OR `dist` DIRECTORIES!** This is for Frontend Build's core Sass setup. Updates will override any changes in these directories. In addition, all custom Sass variables should be placed in `src/scss/application/global/_variables-custom.scss`.

### Base Styles

One feature to using Frontend Build is it's ability to quickly setup base and common styles. Edit the variables in `src/scss/application/global/_variables.scss` to configure your project's theme. To add additional variables, use the `src/scss/application/global/_variables-custom.scss` file (this allows Frontend Build to be updated in the future).

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

### v4.1.1 (TBD)
* Removed webpack from the build process, opting for gulp instead

### v4.1.0 (July 13, 2017)
* Removed toolkit
* Updated Drupal 7 styles
* Updated documentation
* Updated plumber error handling
* Fix for font directory copying issue (https://github.com/bmarshall511/frontend/issues/6)
* Fix for styleguide typos
* Fix for gulp image path
* Fix for `js-transpile` task error from stopping the build
* Fix for Compass compile issue during watch when an error is found
* Fix for npm publish error
* Fix for elint error bug
* Fix for README typo
* New scss-lint config file
* New warning when editing Frontend Build core scss files
* New mixins
* New SCSS variables:
  * `$blockquote-letter-spacing`
  * `$global-min-width`
  * `$button-letter-spacing`
  * `$anchor-color-visited`
  * `$anchor-text-decoration-visited-hover`
  * `$selection-background`
  * `$selection-color`
  * `$paragraph-letter-spacing`
  * `$code-letter-spacing`
  * `$pager-link-decoration`
  * `$pager-link-decoration-hover`
  * `$figure-caption-style`
  * `$figure-border`
  * `$figure-margin`
  * `$figure-padding`
  * `$figure-caption-letter-spacing`
  * `$figure-caption-size`
* New node modules:
  * `babel-preset-react` to support React applications by default
  * `css-loader` and `style-loader` to import CSS from JS (https://webpack.js.org/guides/code-splitting-css/)
  * `json-loader` to fix webpack error with json files (https://github.com/request/request/issues/1529#issuecomment-103454943)

### v4.0.0 (June 21, 2017)
- A complete rewrite of the NPM package and gulp using Babel and ES2015
- Now supports React, ES2016 and Babel
- Integrates with [kss](https://github.com/kss-node/kss-node) to automate the creation of stylesheets

### v3.0.3 (dev)
- Integrated [gulp-cached](https://www.npmjs.com/package/gulp-cached).
- Integrated [gulp-plumber](https://www.npmjs.com/package/gulp-plumber).
- Integrated [gulp-notify](https://www.npmjs.com/package/gulp-notify).
- Changed ```gulp compile``` to ```gulp dev```

### v3.0.2 (April 27, 2017)
- Integrated [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin).
- Integrated [gulp-uncss](https://www.npmjs.com/package/gulp-uncss).

### v3.0.1 (April 5, 2017)
- Removed optional compiled JS libraries.
- Removed deprecated table variables.
- Updated documentation.
- Created a ```gulp variables``` task to automatically setup a application ```_variables.scss``` file.
- Added the ```$button-font-weight``` variable.
- Changed the default value of the ```$button-background``` variable.
- Added the the ```.screen-reader-text``` styles as an extendable (```%screen-reader-text```).
- Added the ```$header-letter-spacing``` variable.
- Updated the variable names for the site header from ```$header``` to ```$site-header``` to fix variable naming conflicts.
- Updated the default values for the ```$site-header-padding-top``` and ```$site-header-padding-bottom```.
- Updated the default value for the ```$gutter-style``` variable.
- Several updates to the default variable for grid layout.
- Added the ```$global-weight-light``` variable.
- Created a ```gulp setup``` task to automatically setup a application for the first time.
- Added additional breakpoint variables for header font sizes.
- Added SCSS linter
