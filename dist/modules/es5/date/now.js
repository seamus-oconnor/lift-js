/*!
* LiftJS Javascript Library v0.2.5
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(Date.now) { return false; }

  // Oringally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
  Date.now = function shimDateNow() {
    return new Date().getTime();
  };

  return true;
});
