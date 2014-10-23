/*!
* LiftJS Javascript Library v0.2.0
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Object.seal ? !1 : (console.warn("Unable to properly shim Object.seal()."), 
  Object.seal = function() {}, !0);
});