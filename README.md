# Frontend v1.0.0
> A light-weight, skeleton frontend framework.

Frontend was created to give frontend developers a jumpstart when building new themes and sites. It's a light-weight, no bloat, skeleton framework that utilizes [Gulp](http://gulpjs.com/) to compile stylesheets, JavaScript files and images in a organized, easy to navigate folder structure. Features include:

* [Gulp](http://gulpjs.com/) - Development task manager
* [Sass](http://sass-lang.com/) - CSS extension language
* [Compass](http://compass-style.org/) - CSS authoring framework
* [JSHint](http://jshint.com/) - JavaScript code quality tester
* [imagemin](https://github.com/imagemin/imagemin) - Image minifier
* [Singularity](https://github.com/at-import/Singularity) - Grid framework
* [Breakpoint](http://breakpoint-sass.com/) - Sass media queries

## Getting Started

These instructions will get you a copy of the project up setup in a new theme. See compiling for notes on how to compile the code while developing.

### Prerequisites

* [Node Package Manager (NPM)](https://www.npmjs.com/)
* [Bundler](http://bundler.io/)

### Installing

[Download](https://github.com/bmarshall511/frontend/archive/master.zip) and extract the Frontend files to your project folder. Then run the following in Terminal from that location:

1. ```bundle install``` to install gem dependencies
2. ```npm install``` to install development dependencies

### Compiling

The following commands can be run to compile:

* ```gulp``` - Compiles, then watches for changes to files to re-compile
* ```gulp lint``` - Lints JavaScript files
* ```gulp scripts``` - Lints and compiles JavaScript files
* ```gulp compass``` - Compiles Sass files
* ```gulp images``` - Minifies images

### Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/bmarshall511/4e6cf39876a5b0394fbe54f1c7fb324b) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/bmarshall511/tags).

### Authors

* **Ben Marshall** - *Initial work* - [bmarshall511](https://github.com/bmarshall511)

See also the list of [contributors](https://github.com/bmarshall511/frontend/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.