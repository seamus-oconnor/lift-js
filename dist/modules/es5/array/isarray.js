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
  return Array.isArray ? !1 : (Array.isArray = function(vArg) {
    return "[object Array]" === Object.prototype.toString.call(vArg);
  }, !0);
});