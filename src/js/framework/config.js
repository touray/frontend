////////////////////////////////////////////////////////////////////////////////
// Theme JS Configuration
//
// Add only theme JS configuration variables in this file.
////////////////////////////////////////////////////////////////////////////////

// Requires jQuery
if ( typeof jQuery == 'undefined' ) {
  var script = document.createElement( 'script' );
  script.type = 'text/javascript';
  script.setAttribute( 'integrity', 'sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=' );
  script.setAttribute( 'crossorigin', 'anonymous' );
  script.src = 'https://code.jquery.com/jquery-3.1.1.min.js';

  document.getElementsByTagName( 'head' )[0].appendChild( script );
}

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
  $( function() {
    // Initialize theme JS on page ready.
    Frontend.init();
  } );
} ) ( jQuery );
