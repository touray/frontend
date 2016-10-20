# Frontend v1.1.0
> A light-weight, skeleton frontend framework.

[Frontend](https://bmarshall511.github.io/frontend/) was created to give frontend developers a jumpstart when building new themes and sites. It's a light-weight, no-bloat, skeleton framework that utilizes [Gulp](http://gulpjs.com/) to compile stylesheets, JavaScript files and images in a organized, easy to navigate folder structure.

## Features

* [Gulp](http://gulpjs.com/) - Development task manager
* [Sass](http://sass-lang.com/) - CSS extension language
* [Compass](http://compass-style.org/) - CSS authoring framework
* [JSHint](http://jshint.com/) - JavaScript code quality tester
* [imagemin](https://github.com/imagemin/imagemin) - Image minifier
* [Singularity](https://github.com/at-import/Singularity) - Grid framework
* [Breakpoint](http://breakpoint-sass.com/) - Sass media queries
* [Complexity](https://www.npmjs.com/package/gulp-complexity) - JavaScript complexity analysis gulp task

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

## Documentation

### CSS, Sass &amp; Compass

Before beginning any theming, be sure to review and set the variables in the ```src/scss/partials/global/_variables.scss``` file.

Sass files are organized into 4 main folders:

* **base** - All theme base styles *(base selectors, styles set via variables)*. **DO NOT EDIT ANY OF THESE FILES!**
* **components** - Includes all styled components broken down into seperate folders including:
 * **design** - Contains all themed sections and standalone components *(header, footer, buttons, etc.)*
 * **lib** - Contains all CSS/Sass libraries *(Foundation, Bootstrap, slick, etc.)*
* **global** - All global Sass functions, variables, mixins, etc.
* **layout** - Contains layout styles *(grids, page templates, etc.)*

### JavaScript

* jQuery is required.
* Global JS variables should be set in the ```src/js/config.js``` file.
* Variables, controllers and services should all be namespaced with ```Frontend``` to avoid conflicts with other libraries.
* All controllers loaded on a page will be automatically initialized and do not needed to be called directly.
* Call ```Frontend.init();``` to reinitialize page controllers *(useful with AJAX calls when new content is added)*.
* Modify the *JavaScript Task* in the ```gulpfile.js``` to add, alter compiled JS files.

Scripts are organized into 3 different categories:

* **Controllers** - Component specific functionality *(main menu dropdown, accordions, etc.)*
* **Services** - Helper functions
* **Libraries** - JavaScript libraries *(jQuery, slick, etc.)*

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/bmarshall511/4e6cf39876a5b0394fbe54f1c7fb324b) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/bmarshall511/frontend/releases).

## Authors

* **Ben Marshall** - *Initial work* - [bmarshall511](https://github.com/bmarshall511)

See also the list of [contributors](https://github.com/bmarshall511/frontend/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Changelog

### v1.1.0 (TBD)

* Updated file documentation.
* Re-organized some folder structures.
* Installed gulp-complexity.
* Added additional Frontend common styles.

### v1.0.0 (Oct. 18, 2016)

* Initial commit.
