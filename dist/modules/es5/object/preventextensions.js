/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Object.preventExtensions ? !1 : (console.warn("Unable to properly shim Object.preventExtensions()."), 
  Object.preventExtensions = function() {}, !0);
});