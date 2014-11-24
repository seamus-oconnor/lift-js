/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Array.prototype.map ? !1 : (Array.prototype.map = function(callback, thisArg) {
    var T, A, k;
    if (!this) throw new TypeError("this is null or not defined");
    var O = Object(this), len = O.length >>> 0;
    if ("function" != typeof callback) throw new TypeError(callback + " is not a function");
    for (thisArg && (T = thisArg), A = new Array(len), k = 0; len > k; ) {
      var kValue, mappedValue;
      k in O && (kValue = O[k], mappedValue = callback.call(T, kValue, k, O), A[k] = mappedValue), 
      k++;
    }
    return A;
  }, !0);
});