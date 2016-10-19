////////////////////////////////////////////////////////////////////////////////
// Theme JS Configuration
//
// Add only theme JS configuration variables in this file.
////////////////////////////////////////////////////////////////////////////////

// Namespace all theme specific functionality
var Frontend = {
  Config: {
    debug: true
  },

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
    $.each( Frontend.Controllers, function( index, value ) {
      console.log( "'" + index + "'" + ' controller initialized...' );
      value.init( function() {
        if ( Frontend.Config.debug ) {
          console.log( '... ' + "'" + index + "'" + ' controller completed.' );
        }
      } );
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


( function( $ ) {
  'use strict';

  Frontend.Services.callback = function( callback ) {
    if ( typeof callback !== 'undefined' ) {
      try {
        callback();
      }
      catch( err ) {
        if ( Frontend.Config.debug ) {
          console.log( err );
        }
      }
    }
  };

} ) ( jQuery );
////////////////////////////////////////////////////////////////////////////////
// Global Controller
//
// This controller runs on every page on the site.
////////////////////////////////////////////////////////////////////////////////

( function( $ ) {
  'use strict';

  Frontend.Controllers.Global = {
    init: function( callback ) {

      // Optional callback function
      Frontend.Services.callback( callback );
    }
  };

} ) ( jQuery );