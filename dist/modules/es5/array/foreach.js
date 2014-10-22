/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*
* Build Date: Wednesday, October 22nd, 2014, 10:23:36 PM
*/


define(function() {
  "use strict";
  return Array.prototype.forEach ? !1 : (Array.prototype.forEach || (Array.prototype.forEach = function(callback, thisArg) {
    var T, k;
    if (!this) throw new TypeError("this is null or not defined");
    var kValue, O = Object(this), len = O.length >>> 0;
    if ("[object Function]" !== {}.toString.call(callback)) throw new TypeError(callback + " is not a function");
    for (arguments.length >= 2 && (T = thisArg), k = 0; len > k; ) k in O && (kValue = O[k], 
    callback.call(T, kValue, k, O)), k++;
  }), !0);
});