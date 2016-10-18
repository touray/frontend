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