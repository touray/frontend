# Frontend

[![Code Climate](https://codeclimate.com/github/bmarshall511/frontend.svg)](https://codeclimate.com/github/bmarshall511/frontend)
[![Build Status](https://travis-ci.org/bmarshall511/frontend.svg?branch=master)](https://travis-ci.org/bmarshall511/frontend)
[![dependencies Status](https://david-dm.org/bmarshall511/frontend/status.svg)](https://david-dm.org/bmarshall511/frontend)
[![devDependencies Status](https://david-dm.org/bmarshall511/frontend/dev-status.svg)](https://david-dm.org/bmarshall511/frontend?type=dev)
[![Join the chat at https://gitter.im/frontendbyben/Lobby](https://badges.gitter.im/frontendbyben/Lobby.svg)](https://gitter.im/frontendbyben/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Frontend is a light-weight, no-bloat frontend development framework. It's purpose is to give developers a jumpstart utilizing Gulp to automate repetitive tasks, a variables file to quickly configure base elements and a standards-driven approach to help avoid spaghetti code while decreasing new developer ramp-up time.

**If you're viewing this at https://github.com/bmarshall511/frontend, you're reading the documentation for the master branch.
[View documentation for the latest release.](https://github.com/bmarshall511/frontend/tree/latest#readme)**

## Getting Started

### Prerequisites
- [NodeJS](http://nodejs.org/download/)
- [Bundler](http://bundler.io)

### Direct download

Download the script [here](https://github.com/bmarshall511/frontend/archive/latest.zip) and include it (unless you are packaging scripts somehow else).

### Installation

Navigate to the frontend directory in Terminal and run the following commands:

1. To install gem dependencies: ```$ bundle install```
2. To install development dependencies: ```$ npm install```
3. For first-time setup: ```$ gulp setup```

## Development Usage

The following commands can be run in the frontend directory during development:

- Compiles, then watches for changes to files to re-compile: ```$ gulp```
- First-time setup <strong><small>(only run once or your variables will be overridden)</small></strong> ```$ gulp setup```
- Create a application variables file <strong><small>(only run once or your variables will be overridden)</small></strong> ```$ gulp variables```
- Compiles for live environments: ```$ gulp compile```
- Lints JavaScript files: ```$ gulp lint```
- Lints and compiles JavaScript files: ```$ gulp scripts```
- Compiles Sass files: ```$ gulp compass```
- Minifies images: ```$ gulp images```

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
