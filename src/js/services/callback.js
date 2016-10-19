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