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
    jQuery.each( Frontend.Controllers, function( index, value ) {
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
  // Header
  Frontend.Controllers.header = {
    init: function( callback ) {
      if ( $( '.header--fixed' ).length ) {
        $( 'body' ).css( 'padding-top', $( '.header--fixed' ).outerHeight() );
      }
    }
  };

  // Menu toggle
  Frontend.Controllers.menuToggle = {
    init: function( callback ) {

    }
  };

  // Header
  Frontend.Controllers.scrollTo = {
    init: function( callback ) {
      $( 'a[href*="#"]' ).click( function( e ) {
        $.scrollTo( this.hash, 1500, { easing:'swing', offset: -($( '.header' ).outerHeight()) });
        return false;
      });
    }
  };

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
