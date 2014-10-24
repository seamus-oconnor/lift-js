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
  return Function.prototype.bind ? !1 : (Function.prototype.bind = function(oThis) {
    if ("function" != typeof this) throw new TypeError("this must be callable");
    var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, NoOp = function() {}, fBound = function() {
      return fToBind.apply(this instanceof NoOp && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };
    return NoOp.prototype = this.prototype, fBound.prototype = new NoOp(), fBound;
  }, !0);
});