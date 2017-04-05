////////////////////////////////////////////////////////////////////////////////
// Theme JS Configuration
//
// Add only theme JS configuration variables in this file.
////////////////////////////////////////////////////////////////////////////////

// Namespace all theme specific functionality
var Frontend = {
////////////////////////////////////////////////////////////////////////////////
// DON'T EDIT ANYTHING BELOW THIS LINE!
////////////////////////////////////////////////////////////////////////////////

  // Theme services and controllers. Don't add directly here, sepearte into the
  // controllers and services directories.
  Services: {},
  Controllers: {},

  // Initialize all page controllers. Should be called when new content is added
  // to the page (ex. AJAX).
  init: function() {
    jQuery.each( Frontend.Controllers, function( index, value ) {
      value.init();
    });
  }
};

( function( $ ) {
  $( function() {
    // Initialize theme JS on page ready.
    Frontend.init();
  } );
} ) ( jQuery );

////////////////////////////////////////////////////////////////////////////////
// Callback Service
//
// Used to call a function's callback.
////////////////////////////////////////////////////////////////////////////////


( function() {
  'use strict';

  Frontend.Services.callback = function( callback ) {
    if ( typeof callback !== 'undefined' ) {
      return callback();
    }
  };

}());
