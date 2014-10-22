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
  return String.prototype.trim ? !1 : (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
  }, !0);
});