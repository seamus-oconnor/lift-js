/*!
* LiftJS Javascript Library v0.2.3
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Object.freeze ? !1 : (Object.freeze = function() {}, {
    warn: "Unable to properly shim Object.freeze()."
  });
});