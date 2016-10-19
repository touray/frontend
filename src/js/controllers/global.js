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