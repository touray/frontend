////////////////////////////////////////////////////////////////////////////////
// Theme JS Configuration
//
// Add only theme JS configuration variables in this file.
////////////////////////////////////////////////////////////////////////////////

// Namespace all theme specific functionality
var Theme = {
  Config: {
    debug: true
  },

  // Theme services and controllers. Don't add directly here, sepearte into the
  // controllers and services directories.
  Services: {},
  Controllers: {},

  // Initialize all page controllers. Should be called when new content is added
  // to the page (ex. AJAX).
  init: function() {
    $.each( Theme.Controllers, function( index, value ) {
      console.log( "'" + index + "'" + ' controller initialized...' );
      value.init( function() {
        if ( Theme.Config.debug ) {
          console.log( '... ' + "'" + index + "'" + ' controller completed.' );
        }
      } );
    });
  }
};

// DON'T EDIT ANYTHING BELOW THIS LINE!

( function( $ ) {
  $( function() {
    Theme.init();
  } );
} ) ( jQuery );
////////////////////////////////////////////////////////////////////////////////
// Callback Service
//
// Used to call a function's callback.
////////////////////////////////////////////////////////////////////////////////


( function( $ ) {
  'use strict';

  Theme.Services.callback = function( callback ) {
    if ( typeof callback !== 'undefined' ) {
      try {
        callback();
      }
      catch( err ) {
        if ( Theme.Config.debug ) {
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

  Theme.Controllers.Global = {
    init: function( callback ) {

      // Optional callback function
      Theme.Services.callback( callback );
    }
  };

} ) ( jQuery );