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
  return Array.prototype.reduceRight ? !1 : (Array.prototype.reduceRight = function(callback) {
    if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
    if ("function" != typeof callback) throw new TypeError(callback + " is not a function");
    var value, t = Object(this), len = t.length >>> 0, k = len - 1;
    if (arguments.length >= 2) value = arguments[1]; else {
      for (;k >= 0 && !(k in t); ) k--;
      if (0 > k) throw new TypeError("Reduce of empty array with no initial value");
      value = t[k--];
    }
    for (;k >= 0; k--) k in t && (value = callback(value, t[k], k, t));
    return value;
  }, !0);
});