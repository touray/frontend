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