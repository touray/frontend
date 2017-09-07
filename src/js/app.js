// app.js

global.$ = global.jQuery = require('jquery');
require('what-input');
require('foundation-sites');

(( $ ) => {
 // Initialize Foundation
  $(document).foundation();
})( jQuery );

// Are you using Drupal 7? Make sure you're using behaviors!
// @see https://www.lullabot.com/articles/understanding-javascript-behaviors-in-drupal
//
// Drupal.behaviors.exampleModule = {
//   attach: (context, settings) => {
//
//   }
// };
