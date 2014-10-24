/*!
* LiftJS Javascript Library v0.2.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Array.isArray ? !1 : (Array.isArray = function(arr) {
    return arr instanceof Array || "[object Array]" === Object.prototype.toString.call(arr);
  }, !0);
});