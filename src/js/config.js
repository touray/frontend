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