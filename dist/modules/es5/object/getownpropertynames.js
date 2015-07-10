/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(Object.getOwnPropertyNames) { return false; }

  Object.getOwnPropertyNames = function getOwnPropertyNames(o) {
    var result = [];

    for(var prop in o) {
      if(o.hasOwnProperty(prop)) {
        result.push(prop);
      }
    }
  };

  return {
    warn: "Unable to properly shim Object.getOwnPropertyNames()."
  };
});
