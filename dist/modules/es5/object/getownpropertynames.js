/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Object.getOwnPropertyNames ? !1 : (Object.getOwnPropertyNames = function(o) {
    var result = [];
    for (var prop in o) o.hasOwnProperty(prop) && result.push(prop);
  }, {
    warn: "Unable to properly shim Object.getOwnPropertyNames()."
  });
});