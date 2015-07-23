/*!
* LiftJS Javascript Library v0.2.6
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(Date.prototype.toISOString) { return false; }

  // Oringally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toIsoString
  function pad(number) {
    var r = number + '';
    if ( r.length === 1 ) {
      r = '0' + r;
    }
    return r;
  }

  Date.prototype.toISOString = function() {
    return this.getUTCFullYear() +
     '-' + pad(this.getUTCMonth() + 1) +
     '-' + pad(this.getUTCDate()) +
     'T' + pad(this.getUTCHours()) +
     ':' + pad(this.getUTCMinutes()) +
     ':' + pad(this.getUTCSeconds()) +
     '.' + ((this.getUTCMilliseconds()/1000).toFixed(3) + '').slice( 2, 5 ) +
     'Z';
  };

  return true;
});
