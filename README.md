# Frontend [![GitHub version](https://badge.fury.io/gh/bmarshall511%2Ffrontend.svg)](https://badge.fury.io/gh/bmarshall511%2Ffrontend)

[![Code Climate](https://codeclimate.com/github/bmarshall511/frontend.svg)](https://codeclimate.com/github/bmarshall511/frontend)
[![Build Status](https://travis-ci.org/bmarshall511/frontend.svg?branch=master)](https://travis-ci.org/bmarshall511/frontend)
[![dependencies Status](https://david-dm.org/bmarshall511/frontend/status.svg)](https://david-dm.org/bmarshall511/frontend)
[![devDependencies Status](https://david-dm.org/bmarshall511/frontend/dev-status.svg)](https://david-dm.org/bmarshall511/frontend?type=dev)

[![Gratipay User](https://img.shields.io/gratipay/user/bmarshall511.svg)](https://gratipay.com/~bmarshall511/)
[![Join the chat at https://gitter.im/frontendbyben/Lobby](https://badges.gitter.im/frontendbyben/Lobby.svg)](https://gitter.im/frontendbyben/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)



> Frontend is a light-weight, no-bloat frontend development framework. It's purpose is to give developers a jumpstart utilizing Gulp to automate repetitive tasks, a variables file to quickly configure base elements and a standards-driven approach to help avoid spaghetti code while decreasing new developer ramp-up time.

**If you're viewing this at https://github.com/bmarshall511/frontend, you're reading the documentation for the master branch.
[View documentation for the latest release.](https://github.com/bmarshall511/frontend/tree/latest#readme)**

Unlike other frontend frameworks like [Foundation](http://foundation.zurb.com/) or [Bootstrap](http://getbootstrap.com/), Frontend doesn't restrict you to any one in particular. You could think of Frontend like a base framework for others like Foundation and Bootstrap. Use what you like, discard what you don't — keeping your files well optimized.

## Getting Started

### Prerequisites
- [NodeJS](http://nodejs.org/download/)
- [Bundler](http://bundler.io)

### Direct download

Download the script [here](https://github.com/bmarshall511/frontend/archive/latest.zip) and include it (unless you are packaging scripts somehow else).

### Installation

Navigate to the frontend directory in Terminal and run the following commands:

1. ```$ bundle install``` To install gem dependencies
2. ```$ npm install``` To install dependencies
3. ```$ gulp setup``` For first-time setup

## Development Usage

The following commands can be run in the frontend directory during development:

- ```$ gulp``` Compiles for live environments
- ```$ gulp compile``` Compiles then watches for changes to files to re-compile (useful during development)
- ```$ gulp setup``` First-time setup **(only run once or your variables will be overridden)**
- ```$ gulp variables``` Create a application variables file **(only run once or your variables will be overridden)**
- ```$ gulp lint``` Lints JavaScript files:
- ```$ gulp scripts``` Lints and compiles JavaScript files
- ```$ gulp compass``` Compiles Sass files
- ```$ gulp images``` Minifies images
- ```$ gulp scss-lint``` Lints SCSS files

## Contributing

Check out the [Contributing Guidelines](CONTRIBUTING.md).

## Security

For vulnerability reports, send an e-mail to `me at benmarshall dot me`.

## Manual release steps

* Increment the "version" attribute of `package.json`
* Commit with the message "Release version x.x.x"
* Create version tag in git
* Create a github release and upload the minified file
* Change the `latest` tag pointer to the latest commit
  * `git tag -f latest`
  * `git push <remote> :refs/tags/latest`
  * `git push origin master --tags`
* Release on npm

## Authors

* [Ben Marshall](https://github.com/bmarshall511)
* And awesome [contributors](https://github.com/bmarshall511/frontend/graphs/contributors)

## Changelog

### v3.0.1
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
