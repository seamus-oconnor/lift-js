/*!
* LiftJS Javascript Library v0.2.1
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Object.isSealed ? !1 : (console.warn("Unable to properly shim Object.isSealed()."), 
  Object.isSealed = function() {}, !0);
});